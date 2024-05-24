const imageDownloader = require("image-downloader");
const mime = require("mime-types");
const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const bucket = "hostme-application";

async function uploadToS3(buffer, originalFilename, mimetype) {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: buffer,
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

class FilesController {
  static async uploadByLink(req, res) {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    const options = {
      url: link,
      dest: `/tmp/${newName}`,
    };
    await imageDownloader.image(options);
    const buffer = fs.readFileSync(`/tmp/${newName}`);
    const url = await uploadToS3(
      buffer,
      newName,
      mime.lookup(`/tmp/${newName}`)
    );
    res.json(url);
  }

  static async uploadImages(req, res) {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { buffer, originalname, mimetype } = req.files[i];
      const url = await uploadToS3(buffer, originalname, mimetype);
      uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
  }
}

module.exports = FilesController;

