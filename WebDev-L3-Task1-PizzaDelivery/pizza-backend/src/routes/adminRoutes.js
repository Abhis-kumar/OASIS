const express = require("express");
const router = express.Router();


const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const { adminDashboard, getRecentOrders } = require("../controllers/adminController");

router.get("/dashboard", protect, adminOnly, adminDashboard);

router.get(
    "/recent-orders",
    protect,
    adminOnly,
    getRecentOrders,
);

module.exports = router;