const express = require("express");
const {
	findAll,
	findById,
	create,
	deleteByid,
	updateById,
	searchHotels_10_100,
} = require("../services/HotelService");
const hotelRouter = express.Router();
hotelRouter
	.get("/search", async (req, res) => {
		const hotels = await searchHotels_10_100();
		res.json(hotels);
	})
	.get("/", async (req, res) => {
		const hotels = await findAll();
		return res.json(hotels);
	})
	.get("/:id", async (req, res) => {
		const hotel = await findById(req.params.id);
		return res.json(hotel);
	})
	.post("/", async (req, res) => {
		const hotel = await create(req.body);
		return res.json(hotel);
	})
	.put("/:id", async (req, res) => {
		const hotel = await updateById(req.params.id, req.body);
		return res.json(hotel);
	})
	.delete("/:id", async (req, res) => {
		const hotel = await deleteByid(req.params.id);
		return res.json(hotel);
	});

module.exports = { hotelRouter };
