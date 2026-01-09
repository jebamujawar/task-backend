require('dotenv').config();

const express = require('express');
//const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/auth");
//const postRoutes = require("./routes/posts");


//dotenv.config();
const app = express();

// Allow your GitHub Pages frontend
app.use(cors({
  origin: ["https://jebamujawar.github.io"], // Replace with your actual GitHub Pages URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// MongoDB connection
const mongoose = require('mongoose');

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is missing in .env!");
}

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));



// Routes
app.use("/api/auth", authRoutes);
//app.use("/api/posts", postRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
