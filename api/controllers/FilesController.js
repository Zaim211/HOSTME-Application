const imageDownloader = require("image-downloader");
const mime = require("mime-types");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucket = "hostme-application";

// Function to upload a file to S3
async function uploadToS3(buffer, originalFilename, mimetype) {
  // Create a new S3 client with specified region and credentials
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  // Generate a new filename based on the current timestamp
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;

  // Upload the file to S3
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: buffer,
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );

  // Return the URL of the uploaded file
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

class FilesController {
  // Method to upload an image from a URL to S3
  static async uploadByLink(req, res) {
    const { link } = req.body; // Get the link from the request body
    const newName = "photo" + Date.now() + ".jpg"; // Generate a new name for the downloaded image

    // Options for downloading the image
    const options = {
      url: link,
      dest: `/tmp/${newName}`,
    };

    // Download the image and save it to a temporary location
    await imageDownloader.image(options);

    // Read the downloaded file into a buffer
    const buffer = fs.readFileSync(`/tmp/${newName}`);

    // Upload the buffer to S3 and get the file URL
    const url = await uploadToS3(
      buffer,
      newName,
      mime.lookup(`/tmp/${newName}`)
    );

    // Send the URL of the uploaded file as the response
    res.json(url);
  }

  // Method to upload multiple images to S3
  static async uploadImages(req, res) {
    const uploadedFiles = [];

    // Loop through each file in the request
    for (let i = 0; i < req.files.length; i++) {
      const { buffer, originalname, mimetype } = req.files[i];

      // Upload each file to S3 and store the URL
      const url = await uploadToS3(buffer, originalname, mimetype);
      uploadedFiles.push(url);
    }

    // Send the URLs of the uploaded files as the response
    res.json(uploadedFiles);
  }
}

module.exports = FilesController;
