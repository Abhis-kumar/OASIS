const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");

const calculatePrice = async (
  pizzaId,
  baseId,
  sauceId,
  cheeseId,
  vegetables
) => {

  // Get Pizza
  const pizza = await Pizza.findById(pizzaId);

  if (!pizza) {
    throw new Error("Pizza not found");
  }

  // Collect all inventory IDs
  const ids = [
    baseId,
    sauceId,
    cheeseId,
    ...vegetables,
  ];

  // Fetch all inventory items in one query
  const inventoryItems = await Inventory.find({
    _id: { $in: ids }
  });

  let total = pizza.price;

  inventoryItems.forEach(item => {
    total += item.price;
  });

  return total;
};

module.exports = calculatePrice;