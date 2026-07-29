const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt")

const {
  findByUsername,
  findByEmail,
  findByUsernameOrEmail,
  createUser,
  findUserById
} = require("../models/userModel");
// Register User
const register = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // Empty Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    // Password Validation
    const passwordRegex = /^(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and contain at least one number."
      });
    }

    // Username Exists
    const existingUsername = await findByUsername(username);

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists."
      });
    }

    // Email Exists
    const existingEmail = await findByEmail(email);

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists."
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save User
    const user = await createUser(
      username,
      email,
      hashedPassword
    );

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error."
    });

  }

};

//Login


const login = async (req, res) => {

  try {

    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    const user = await findByUsernameOrEmail(login);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password."
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password."
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }

};

//Dasboard

const dashboard = (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome to Dashboard",

        user: req.user

    });

};

const getCurrentUser = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



module.exports = {
  register,
  login,
  dashboard,
  getCurrentUser

};