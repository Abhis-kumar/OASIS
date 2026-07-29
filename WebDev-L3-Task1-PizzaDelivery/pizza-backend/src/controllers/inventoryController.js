const Inventory = require("../models/Inventory");

// =========================
// Add Inventory
// =========================
const addInventory = async (req, res) => {
  try {
    const { name, type, stock, price } = req.body;

    if (!name || !type || stock == null || price == null) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const item = await Inventory.create({
      name,
      type,
      stock,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Inventory item added successfully",
      item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Get All Inventory
// =========================
const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({
      type: 1,
      name: 1,
    });

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Get Inventory By ID
// =========================
const getInventoryById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Get Inventory By Type
// =========================
const getInventoryByType = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      type: req.params.type,
    });

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Update Inventory
// =========================
const updateInventory = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Delete Inventory
// =========================
const deleteInventory = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// =========================
// Low Stock Items
// =========================
const getLowStockItems = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      stock: { $lte: 5 },
    });

    res.status(200).json({
      success: true,
      count: inventory.length,
      inventory,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addInventory,
  getInventory,
  getInventoryById,
  getInventoryByType,
  updateInventory,
  deleteInventory,
  getLowStockItems,
};