require("dotenv").config();

const Pizza = require("../src/models/Pizza");
const Inventory = require("../src/models/Inventory");
const User = require("../src/models/User");

const connectDB = require("../src/config/db");

const {
  pizzas,
  inventory,
  getAdmin,
} = require("../src/seed/seedData");

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("✅ Connected to MongoDB");

    // Delete old data
    await Pizza.deleteMany();
    await Inventory.deleteMany();
    await User.deleteMany({ role: "admin" });

    console.log("🗑 Old data removed");

    // Insert Pizzas
    await Pizza.insertMany(pizzas);
    console.log(`🍕 ${pizzas.length} Pizzas inserted`);

    // Insert Inventory
    await Inventory.insertMany(inventory);
    console.log(`📦 ${inventory.length} Inventory items inserted`);

    // Create Admin
    const admin = await getAdmin();
    await User.create(admin);

    console.log("👨‍💼 Admin created");
    console.log("--------------------------------");
    console.log("🎉 Database Seeded Successfully");
    console.log("--------------------------------");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();