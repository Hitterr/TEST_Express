const { default: mongoose } = require("mongoose");
const { Hotel } = require("../models/Hotel");
var { Server } = require("socket.io");

const create = async (data) => {
	try {
		const hotel = new Hotel(data);
		return await hotel.save();
	} catch (error) {}
};
const findAll = async () => {
	try {
		return await Hotel.find();
	} catch (error) {}
};
const findById = async (id) => {
	try {
		return await Hotel.findById(id);
	} catch (error) {}
};
const updateById = async (id, data) => {
	try {
		return await Hotel.findByIdAndUpdate(id, data, { new: true });
	} catch (error) {}
};
const deleteByid = async (id) => {
	try {
		return await Hotel.findByIdAndDelete(id);
	} catch (error) {}
};
const searchHotels_10_100 = async () => {
	const Hotels = await Hotel.find({
		rooms: { $gte: 10, $lte: 100 },
	});
	return Hotels;
};
module.exports = {
	searchHotels_10_100,
	create,
	deleteByid,
	findAll,
	findById,
	updateById,
};
