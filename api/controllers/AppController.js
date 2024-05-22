const mongoose = require("mongoose");

class AppController {
  // Test the connection
   static async test(req, res) {
    mongoose.connect(process.env.MONGO_URL);
    return res.json({ message: 'Test ok' });
  }
}

module.exports = AppController;