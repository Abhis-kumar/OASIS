const express = require("express");
const router = express.Router();

const {
  createPizza,
  getAllPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.get("/", getAllPizzas);

router.get("/:id", getPizzaById);

// Admin Routes
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createPizza
);

router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updatePizza
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deletePizza
);

module.exports = router;