const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },                 // Payload
    process.env.JWT_SECRET, // Secret Key
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = generateToken;