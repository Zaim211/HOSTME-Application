const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaceSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true},
  address: { type: String, required: true},
  photos: { type: [String], required: true},
  description: { type: String, required: true},
  perks: { type: [String], required: true},
  extraInfo: { type: String, required: true},
  checkIn: { type: Number, required: true},
  checkOut: { type: Number, required: true},
  maxGuests: { type: Number, required: true},
  price: { type: Number, required: true},
}, {timestamps:true});

const PlaceModel = mongoose.model("Place", PlaceSchema);

module.exports = PlaceModel;
