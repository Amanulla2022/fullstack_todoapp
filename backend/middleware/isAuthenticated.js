const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Not authorized!",
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);

    if (!token) {
      return res.status(401).json({
        message: "Invalid token!",
        success: false,
      });
    }

    req.user = { userId: decode.userId };
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

module.exports = isAuthenticated;
