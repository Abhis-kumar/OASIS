const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");
const { getIO } = require("../socket");


const createOrder = async (req, res) => {
  try {
    const { items, deliveryDetails, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const {
        pizza,
        base,
        sauce,
        cheese,
        vegetables = [],
        quantity,
      } = item;

      // Fetch Pizza
      const pizzaData = await Pizza.findById(pizza);

      if (!pizzaData) {
        return res.status(404).json({
          success: false,
          message: "Pizza not found",
        });
      }

      // Fetch Inventory
      const baseData = await Inventory.findById(base);
      const sauceData = await Inventory.findById(sauce);
      const cheeseData = await Inventory.findById(cheese);

      if (!baseData || !sauceData || !cheeseData) {
        return res.status(404).json({
          success: false,
          message: "Invalid inventory selection",
        });
      }

      // Fetch Vegetables
      const vegetableItems = await Inventory.find({
        _id: { $in: vegetables },
      });

      // Stock Check
      const allItems = [
        baseData,
        sauceData,
        cheeseData,
        ...vegetableItems,
      ];

      for (const stockItem of allItems) {
        if (stockItem.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: `${stockItem.name} is out of stock`,
          });
        }
      }

      // Price Calculation
      let itemPrice =
        pizzaData.price +
        baseData.price +
        sauceData.price +
        cheeseData.price;

      vegetableItems.forEach((veg) => {
        itemPrice += veg.price;
      });

      itemPrice *= quantity;

      totalAmount += itemPrice;

      // Reduce Inventory
      for (const stockItem of allItems) {
        stockItem.stock -= quantity;
        await stockItem.save();
      }

      orderItems.push({
        pizza,
        base,
        sauce,
        cheese,
        vegetables,
        quantity,
        price: itemPrice,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryDetails,
      paymentMethod,
      paymentStatus:
        paymentMethod === "ONLINE" ? "Paid" : "Pending",
      totalAmount,
      orderStatus: "Order Received",
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// update order status

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const validStatus = [
      "Order Received",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatus.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    try {
      const io = getIO();

      io.to(order.user.toString()).emit("order-status-updated", {
        orderId: order._id,
        status: order.orderStatus,
      });
    } catch (err) {
      console.log("Socket not initialized");
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

const getMyOrders = async (req, res) => {
  try {

    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

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
const getAllOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.pizza")
      .populate("items.base")
      .populate("items.sauce")
      .populate("items.cheese")
      .populate("items.vegetables")
      .sort({ createdAt: -1 });

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
  createOrder,
  updateOrderStatus,
  getMyOrders,
  getAllOrders
};