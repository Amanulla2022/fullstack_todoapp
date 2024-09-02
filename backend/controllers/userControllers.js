const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// function to create or register a new user
const registerUser = async (req, res) => {
  try {
    // extracting name, username, email, password from request body
    const { name, userName, emailId, password } = req.body;

    // if anything is missing give error/success : false
    if (!name || !userName || !emailId || !password) {
      return res.status(400).json({
        message: "Something is missing, Please fill all the details",
        success: false,
      });
    }

    // find a user by emailId
    const user = await User.findOne({ emailId });

    // if emailId already exists in user DB give response
    if (user) {
      return res.status(400).json({
        message: "User already exists with this emailId!",
        success: false,
      });
    }

    // hash the written password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create or register a new user with hashed password
    await User.create({
      name,
      userName,
      emailId,
      password: hashedPassword,
    });

    // success message
    return res.status(200).json({
      message: "User registered successfully!",
      success: true,
    });
  } catch (error) {
    // failure response
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// function to login a user
const loginUser = async (req, res) => {
  try {
    // extract the emailId and password from request body
    const { emailId, password } = req.body;

    // if anything is missing give error/success : false
    if (!emailId || !password) {
      return res.status(400).json({
        message: "Something is missing, Please fill all the details",
        success: false,
      });
    }

    // find a user by emailId
    let user = await User.findOne({ emailId });

    // if user not found return failure message
    if (!user) {
      return res.status(400).json({
        message: "User not exist with this emailId!",
        success: false,
      });
    }

    // checking that entered password is correct or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if password is wrong return failure message
    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect emailId or password",
        success: false,
      });
    }

    // create a token payload containing the user's unique ID
    const tokenData = {
      userId: user._id,
    };

    // Generate a JWT with the user's ID as payload
    // The token is signed using the secret key stored in environment variables
    // and will expire in 1 day (24 hours)
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // construct a user object to be sent in the response
    // This object includes the user's ID, name, username, email, and password
    user = {
      _id: user._id,
      name: user.name,
      userName: user.userName,
      emailId: user.emailId,
      password: user.password,
    };

    // Set a cookie named 'token' with the JWT generated earlier
    // The cookie has a max age of 1 day (24 hours) and is HTTP-only for security
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 100,
        httpOnly: true,
      })
      .json({
        message: `Welcome back ${user.name}`,
        user,
        success: true,
      });
  } catch (error) {
    // failure message
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// function to logout a user
const logoutUser = async (req, res) => {
  try {
    // clear the 'token' cookie by setting its maxAge to 0
    // This effectively logs the user out by removing the cookie
    return res.status(200).cookie("token", { maxAge: 0 }).json({
      message: "Logged out successfully!",
      success: true,
    });
  } catch (error) {
    // failure response
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

module.exports = { registerUser, loginUser, logoutUser };
