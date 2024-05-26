const Hosting = require("../models/hosting.model");
const PlaceModel = require("../models/place.model");
const mongoose = require("mongoose");

// middleware for authentication
const jwt = require("jsonwebtoken");
const jwtSecret = "hdkjforuthslazirjdthsbxyrj";

function getUserDataFromReq(req) {
  // Extract the token from the request
    return new Promise((resolve, reject) => {
      jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        resolve(userData);
      });
    });
}

class HostingController {
  // create a hosting class
  static async createHosting(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
    Hosting.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    })
      .then((doc) => {
        res.json(doc);
      })
      .catch((error) => {
        res.status(422).json(error);
        throw error;
      });
  }

  static async getHosting(req, res) {
    // Fetch the hostings where the user ID matches the current user's ID
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    res.json(await Hosting.find({ user: userData.id }).populate("place"));
  }

  static async getHosted(req, res) {
    // Fetch the hostings where the place ID belongs to the current user's places
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    
    // Fetch the places owned by the current user
    const places = await PlaceModel.find({ owner: userData.id });
  
    // Extract place IDs
    const placeIds = places.map(place => place._id);
  
    // Fetch hostings where the place ID belongs to the current user's places
    res.json(await Hosting.find({ place: { $in: placeIds } }).populate('place'));
  }
}

module.exports = HostingController;
