const Inventory = require("../models/Inventory");

const checkInventory = async (
  base,
  sauce,
  cheese,
  vegetables
) => {

  const baseItem = await Inventory.findById(base);

  if (!baseItem || baseItem.stock <= 0) {
    return {
      success: false,
      message: `${baseItem?.name || "Pizza Base"} is Out of Stock`
    };
  }

  const sauceItem = await Inventory.findById(sauce);

  if (!sauceItem || sauceItem.stock <= 0) {
    return {
      success: false,
      message: `${sauceItem?.name || "Sauce"} is Out of Stock`
    };
  }

  const cheeseItem = await Inventory.findById(cheese);

  if (!cheeseItem || cheeseItem.stock <= 0) {
    return {
      success: false,
      message: `${cheeseItem?.name || "Cheese"} is Out of Stock`
    };
  }

  for (const veg of vegetables) {

    const vegetable = await Inventory.findById(veg);

    if (!vegetable || vegetable.stock <= 0) {
      return {
        success: false,
        message: `${vegetable?.name || "Vegetable"} is Out of Stock`
      };
    }

  }

  return {
    success: true
  };

};

module.exports = checkInventory;