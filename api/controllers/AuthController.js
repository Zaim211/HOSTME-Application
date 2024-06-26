const User = require("../models/user.model.js");
const mongoose = require("mongoose");
require("dotenv").config();

// middleware for authentication
const jwt = require("jsonwebtoken");
const jwtSecret = "aefijeiyydhhfhhfizao";

// encrypting passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

class AuthController {
  // register a user
  static async registerUser(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { name, email, password, addedPhotos } = req.body;
    try {
      const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
        profilePicture: addedPhotos,
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  }

  // login a user with google
  static async googleLogin(req, res) {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const { name, email, photoURL } = req.body;

      let userDoc = await User.findOne({ email });
      if (userDoc) {
        const token = jwt.sign({ id: userDoc._id }, jwtSecret);
        const { password, ...rest } = userDoc.toObject();
        res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
          profilePicture: photoURL,
        });
        const token = jwt.sign({ id: newUser._id }, jwtSecret);
        const { password, ...rest } = newUser.toObject();
        res
          .status(200)
          .cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
          })
          .json(rest);
      }
    } catch (e) {
      console.error('Error during Google login:', e);
      res.status(422).json({ error: 'Unable to process Google login' });
    }
  }
  
  static async loginUser(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { email, password } = req.body;
    
    try {
        const userDoc = await User.findOne({ email });
        
        if (!userDoc) {
            return res.status(404).json({ message: "Email not found" });
        }

        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (!passOk) {
            return res.status(401).json({ message: "Invalid password" });
        }

        if (!jwtSecret) {
            console.error("JWT secret key is not defined.");
            return res.status(500).json({ error: "Internal server error" });
        }

        jwt.sign(
            {
                email: userDoc.email,
                id: userDoc._id,
            },
            jwtSecret,
            {},
            (err, token) => {
                if (err) {
                    console.error("JWT signing error:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }
                res.cookie("token", token).json(userDoc);
            }
        );
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
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
        res.json({ name, email,  _id });
      });
    } else {
      res.json(null);
    }
  }


  // reset password
  static async resetPassword(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email and new password are required" });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while resetting the password" });
    }
  }
}

module.exports = AuthController;
