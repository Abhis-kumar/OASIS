const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["base", "sauce", "cheese", "vegetable"],
    },

    stock: {
      type: Number,
      required: true,
      default: 100,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);