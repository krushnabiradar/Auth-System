const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require('bcryptjs');


const app = express();
const PORT = 5000; // You can change the port number if needed

// Connect to MongoDB (you need to have MongoDB running locally or provide a connection string)
mongoose
  .connect(process.env.DB_LOCATION, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Register endpoint
app.post("/register", async (req, res) => {
  const { name, dob, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    // Create a new user with hashed password
    const newUser = new User({ name, dob, email, password: hashedPassword });
    await newUser.save();

    // Return success message
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If user found and password matches, return success message
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all users endpoint
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
