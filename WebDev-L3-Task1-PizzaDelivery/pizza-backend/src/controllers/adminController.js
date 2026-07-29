const User = require("../models/User");
const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");



const adminDashboard = async (req, res) => {
  try {

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalPizzas = await Pizza.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalInventoryItems = await Inventory.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Order Received",
    });

    const preparingOrders = await Order.countDocuments({
      orderStatus: "Preparing",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const lowStockItems = await Inventory.countDocuments({
      $expr: {
        $lte: ["$stock", "$threshold"],
      },
    });

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalPizzas,
        totalOrders,
        totalInventoryItems,
        pendingOrders,
        preparingOrders,
        deliveredOrders,
        lowStockItems,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getRecentOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      orders,
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
    adminDashboard,
    getRecentOrders,
};