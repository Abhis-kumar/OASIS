const express = require("express");

const router = express.Router();

const {
  addInventory,
  getInventory,
  getInventoryById,
  getInventoryByType,
  updateInventory,
  deleteInventory,
  getLowStockItems,
} = require("../controllers/inventoryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// =====================
// Public Routes
// =====================
router.get("/", getInventory);

router.get("/type/:type", getInventoryByType);

router.get("/low-stock", getLowStockItems);

router.get("/:id", getInventoryById);

// =====================
// Admin Routes
// =====================
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addInventory
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateInventory
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteInventory
);

module.exports = router;