require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log("Mongo DB connected"))
	.catch((error) => console.log("Error occured", error));

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
	try {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			return res.status(400).json({
				error: "All fields (username, email, password) are required",
			});
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword,
		});
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: "Error registering user" });
	}
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ error: "Email and password are required" });
		}

		const user = await User.findOne({ email });
		console.log("User details", user);
		if (!user) {
			return res.status(400).json("User doesnt exists! Please register");
		}
		console.log("password user and req", user.password, password);
		const isMatch = await bcrypt.compare(password, user.password);
		console.log("Is password matching? ", isMatch);
		if (!isMatch) {
			return res.status(400).json("Invalid credentials");
		}
		res.json({ message: "Logged in Successfull" });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: "Error in logging in" });
	}
});

app.get("/", async (req, res) => {
	res.send("server is running");
});
app.listen(PORT, console.log("server running in port", PORT));
