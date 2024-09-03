const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

// Load environment variables from the .env file
dotenv.config();

// get the PORT number by .env file
const PORT = process.env.PORT_URL;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://fullstack-todoapp-qfjv.onrender.com",
  ], // allow requests from this origin
  credentials: true, // allowing cookies credentials to be sent with requests
};

// Middleware for handling CORS
app.use(cors(corsOptions));

// Middleware for Parse incoming JSON requests
app.use(express.json());

// Middleware for Parse cookies from incoming requests
app.use(cookieParser());

// Routes for user and to-do operations
app.use("/api/moretask/user", userRoutes); // mounting user routes
app.use("/api/moretask/todo", todoRoutes); // mounting todo routes

// Start the server and connected to database
app.listen(PORT, () => {
  connectToDB();
  console.log(`Server started on PORT no - ${PORT}`);
});
