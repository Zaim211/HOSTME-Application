const mongoose = require("mongoose");
const { Schema } = mongoose;

const hostingSchema = new Schema({
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: {type: Number, required: true},
});

const Hosting = mongoose.model("Hosting", hostingSchema);

module.exports = Hosting;