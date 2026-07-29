const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Admin Routes
router.get("/", protect, adminOnly, getAllUsers);

router.put(
  "/:id/role",
  protect,
  adminOnly,
  updateUserRole
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

module.exports = router;