const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {

    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No Token."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user details (without password)
    req.user = await User.findById(decoded.id).select("-password");

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });

  }
};

module.exports = protect;