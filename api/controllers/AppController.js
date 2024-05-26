const mongoose = require("mongoose");

class AppController {
  // Test the connection route
   static async test(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    return res.json({ message: 'Test ok' });
  }
}

module.exports = AppController;
