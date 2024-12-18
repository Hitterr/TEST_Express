const mongoose = require("mongoose");
const HotelSchema = new mongoose.Schema({
	name: String,
	fabricationDate: Date,
	rooms: { type: Number, default: 10 },
});
const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = { Hotel };
