const Place = require("../models/place.model");
const mongoose = require("mongoose");
require("dotenv").config();
// middleware for authentication
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

class PlaceController {
  static createPlaces(req, res) {
<<<<<<< HEAD
    // Create a new place
  mongoose.connect(process.env.MONGO_URL);
=======
    // Create a new Place
    mongoose.connect(process.env.MONGO_URL);
>>>>>>> 0d5fc0fd964f1d33889a7bab2fe174d4620a73c7
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
    try {
      const { search } = req.query;
      let query = {};

      if (search) {
        query = {
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { address: { $regex: search, $options: 'i' } }
          ]
        };
      }

      const places = await Place.find(query);
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PlaceController;
