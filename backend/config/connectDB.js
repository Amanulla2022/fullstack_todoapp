const mongoose = require("mongoose");

// function to connect to database
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongo Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
