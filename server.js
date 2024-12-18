const express = require("express");
const app = express();
const http = require("http");
var path = require("path");

const socketio = require("socket.io");

const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const { hotelRouter } = require("./routers/HoterRouter");
const { updateById, findById } = require("./services/HotelService");
mongoose
	.connect("mongodb://localhost:27017/express_db")
	.then(() => {
		console.log("mongoose is working !");
	})
	.catch((error) => {
		console.log(error);
	});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/ui", (req, res) => {
	return res.render("index");
});
app.use("/", hotelRouter);

const socketServer = http.createServer(app, { cors: { origin: "*" } });
const io = socketio(socketServer);
io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("addRoom", async (data) => {
		if (data.rooms && data.id) {
			const Hotel = await findById(data.id);
			console.log(Hotel);
			Hotel.rooms += data.rooms;
			Hotel.save();
		}
	});
});

socketServer.listen(3000, () => {
	console.log(" server is running on port 3000");
});
