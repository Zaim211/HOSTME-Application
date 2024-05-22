const Place = require("../models/place.model");
const mongoose = require("mongoose");

// middleware for authentication
const jwt = require("jsonwebtoken");
const jwtSecret = "hdkjforuthslazirjdthsbxyrj";

class PlaceController {
  static createPlaces(req, res) {
    // Create a new place
    mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
  }

  static async getUserPlaces(req, res) {
    // Fetch the places owned by the current user
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  }

  static async updatePlaces(req, res) {
    // Update a place
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        await placeDoc.save();
        res.status(200).json("Saved!");
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    });
  }

  static async getPlacesById(req, res) {
    // Fetch a place by ID
    mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    res.json(await Place.findById(id));
  }

  static async getAllPlaces(req, res) {
    // Fetch all places
    mongoose.connect(process.env.MONGO_URL);

    const { search } = req.query; // Extract the search query from request query parameters

    try {
      let places;

      if (search) {
        // If search query is provided, filter places by address or title
        places = await Place.find({
          $or: [
            { address: { $regex: search, $options: "i" } }, // Case-insensitive search
            { title: { $regex: search, $options: "i" } },
          ],
        });
      } else {
        // If no search query is provided, return all places
        places = await Place.find();
      }

      res.json(places);
    } catch (error) {
      console.error("Error fetching places:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = PlaceController;
