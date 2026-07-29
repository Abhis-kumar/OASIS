const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { register,
   login,
    dashboard,
  getCurrentUser
 } = require("../controllers/authController");

// Register Route
router.post("/register", register);
router.post("/login", login);

router.get("/dashboard",verifyToken,dashboard)
router.get("/me", verifyToken, getCurrentUser);

module.exports = router;