const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// ============================
// Register
// ============================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.verificationToken = verificationToken;
    user.verificationTokenExpire =
      Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    await user.save();

    // Verification URL
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;

    // Email Template
    const message = `
      <h2>Welcome to Pizza Delivery 🍕</h2>

      <p>Thank you for registering.</p>

      <p>Please click the button below to verify your email.</p>

      <a href="${verifyUrl}"
         style="
            background:#ff5722;
            color:white;
            padding:10px 20px;
            text-decoration:none;
            border-radius:5px;
         ">
         Verify Email
      </a>

      <p>This link expires in 24 hours.</p>
    `;

    // Send Email
    await sendEmail({
      email: user.email,
      subject: "Verify Your Email",
      message,
    });

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email before logging in.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ============================
// Login
// ============================
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

// ============================
// Verify Email
// ============================
const verifyEmail = async (req, res) => {
  try {

    const { token } = req.params;

    // Find user with valid token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link.",
      });
    }

    // Verify account
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};


// ============================
// Get Profile
// ============================
const getProfile = async (req, res) => {

  return res.status(200).json({
    success: true,
    user: req.user,
  });

};

//======================
// forget password
//=====================
const forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash Token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save Hashed Token
    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire =
      Date.now() + 15 * 60 * 1000;

    await user.save();

    // Frontend URL
    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
      <h2>Reset Your Password</h2>

      <p>Click below to reset your password.</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link expires in 15 minutes.</p>
    `;

    await sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

//=====================
//resetPassword
//====================

const resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Hash the token received from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;

    // Clear reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful. Please login.",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
};