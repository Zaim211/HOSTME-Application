const User = require("../models/user.model.js");
const mongoose = require("mongoose");

// middleware for authentication
const jwt = require("jsonwebtoken");
const jwtSecret = "hdkjforuthslazirjdthsbxyrj";

// encrypting passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

class AuthController {
  // register a user
  static async registerUser(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { name, email, password } = req.body;

    try {
      const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  }

  // login a user
  static async loginUser(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.json("not found");
    }
  }

  // logout a user
  static async logoutUser(req, res) {
    res.cookie("token", "").json(true);
  }

  // get user profile
  static getProfile(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      });
    } else {
      res.json(null);
    }
  }
}

module.exports = AuthController;
