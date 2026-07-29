const bcrypt = require("bcryptjs");
const pizzas = require("./pizzas");

// =========================
// Inventory
// =========================

const inventory = [
  // Bases
  {
    name: "Thin Crust",
    type: "base",
    stock: 100,
    price: 60,
    isAvailable: true,
  },
  {
    name: "Cheese Burst",
    type: "base",
    stock: 80,
    price: 120,
    isAvailable: true,
  },
  {
    name: "Pan Pizza",
    type: "base",
    stock: 90,
    price: 80,
    isAvailable: true,
  },

  // Sauces
  {
    name: "Tomato Sauce",
    type: "sauce",
    stock: 100,
    price: 20,
    isAvailable: true,
  },
  {
    name: "BBQ Sauce",
    type: "sauce",
    stock: 80,
    price: 30,
    isAvailable: true,
  },
  {
    name: "Peri Peri Sauce",
    type: "sauce",
    stock: 70,
    price: 35,
    isAvailable: true,
  },

  // Cheese
  {
    name: "Mozzarella",
    type: "cheese",
    stock: 100,
    price: 60,
    isAvailable: true,
  },
  {
    name: "Cheddar",
    type: "cheese",
    stock: 80,
    price: 70,
    isAvailable: true,
  },
  {
    name: "Parmesan",
    type: "cheese",
    stock: 70,
    price: 90,
    isAvailable: true,
  },

  // Vegetables
  {
    name: "Onion",
    type: "vegetable",
    stock: 100,
    price: 15,
    isAvailable: true,
  },
  {
    name: "Capsicum",
    type: "vegetable",
    stock: 100,
    price: 20,
    isAvailable: true,
  },
  {
    name: "Tomato",
    type: "vegetable",
    stock: 100,
    price: 15,
    isAvailable: true,
  },
  {
    name: "Corn",
    type: "vegetable",
    stock: 100,
    price: 20,
    isAvailable: true,
  },
  {
    name: "Mushroom",
    type: "vegetable",
    stock: 80,
    price: 30,
    isAvailable: true,
  },
  {
    name: "Olives",
    type: "vegetable",
    stock: 60,
    price: 35,
    isAvailable: true,
  },
  {
    name: "Jalapeno",
    type: "vegetable",
    stock: 60,
    price: 25,
    isAvailable: true,
  },
  {
    name: "Paneer",
    type: "vegetable",
    stock: 70,
    price: 40,
    isAvailable: true,
  }
];

// =========================
// Admin
// =========================

const getAdmin = async () => {
  return {
    name: "Admin",
    email: "admin@gmail.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
    isVerified: true,
  };
};

module.exports = {
  pizzas,
  inventory,
  getAdmin,
};