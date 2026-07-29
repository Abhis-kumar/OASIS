const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");




const {
  createRazorpayOrder,
  verifyPayment,
  placeCODOrder
} = require("../controllers/paymentController");

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);
router.post("/cod", protect, placeCODOrder);
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Payment route working",
  });
});
module.exports = router;