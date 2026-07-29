const crypto = require("crypto");

const razorpay = require("../utils/razorpay");

const Order = require("../models/Order");
const Pizza = require("../models/Pizza");
const Inventory = require("../models/Inventory");
const calculatePrice = require("../utils/calculatePrice");




const createRazorpayOrder = async (req, res) => {
  try {
    const { items } = req.body;

    console.log("Items Received:");
    console.log(JSON.stringify(items, null, 2));

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    for (const item of items) {

      const pizza = await Pizza.findById(item.pizza);

      if (!pizza) {
        return res.status(404).json({
          success: false,
          message: "Pizza not found",
        });
      }

      let itemPrice = pizza.price;

      // Customized Pizza
      if (item.base && item.sauce && item.cheese) {

        const base = await Inventory.findById(item.base);
        const sauce = await Inventory.findById(item.sauce);
        const cheese = await Inventory.findById(item.cheese);

        if (!base || !sauce || !cheese) {
          return res.status(404).json({
            success: false,
            message: "Invalid customized pizza",
          });
        }

        itemPrice += base.price;
        itemPrice += sauce.price;
        itemPrice += cheese.price;

        const vegetables = await Inventory.find({
          _id: {
            $in: item.vegetables || [],
          },
        });

        vegetables.forEach((veg) => {
          itemPrice += veg.price;
        });
      }

      totalAmount += itemPrice * item.quantity;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json({
      success: true,
      order: razorpayOrder,
      totalAmount,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// verify payment
const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
      deliveryDetails,
    } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Failed",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {

      const pizza = await Pizza.findById(item.pizza);

      if (!pizza) {
        return res.status(404).json({
          success: false,
          message: "Pizza not found",
        });
      }

      let itemPrice = pizza.price;

      let base = null;
      let sauce = null;
      let cheese = null;
      let vegetables = [];

      if (item.base && item.sauce && item.cheese) {

        base = await Inventory.findById(item.base);
        sauce = await Inventory.findById(item.sauce);
        cheese = await Inventory.findById(item.cheese);

        if (!base || !sauce || !cheese) {
          return res.status(404).json({
            success: false,
            message: "Invalid customized pizza",
          });
        }

        itemPrice += base.price;
        itemPrice += sauce.price;
        itemPrice += cheese.price;

        vegetables = await Inventory.find({
          _id: {
            $in: item.vegetables || [],
          },
        });

        vegetables.forEach((veg) => {
          itemPrice += veg.price;
        });

        await Inventory.findByIdAndUpdate(base._id, {
          $inc: { stock: -item.quantity },
        });

        await Inventory.findByIdAndUpdate(sauce._id, {
          $inc: { stock: -item.quantity },
        });

        await Inventory.findByIdAndUpdate(cheese._id, {
          $inc: { stock: -item.quantity },
        });

        for (const veg of vegetables) {
          await Inventory.findByIdAndUpdate(veg._id, {
            $inc: { stock: -item.quantity },
          });
        }
      }

      itemPrice *= item.quantity;

      totalAmount += itemPrice;

      orderItems.push({
        pizza: pizza._id,
        base: base ? base._id : null,
        sauce: sauce ? sauce._id : null,
        cheese: cheese ? cheese._id : null,
        vegetables: vegetables.map((v) => v._id),
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryDetails,
      totalAmount,
      paymentMethod: "ONLINE",
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      orderStatus: "Order Received",
    });

    res.status(201).json({
      success: true,
      message: "Payment Verified Successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Cash on delivery

const placeCODOrder = async (req, res) => {
  try {
    const { items, deliveryDetails } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart Empty",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {

      const pizza = await Pizza.findById(item.pizza || item._id);

      if (!pizza) {
        return res.status(404).json({
          success: false,
          message: "Pizza not found",
        });
      }

      let itemPrice = pizza.price;

      // Customized Pizza
      if (item.base && item.sauce && item.cheese) {

        const base = await Inventory.findById(item.base);
        const sauce = await Inventory.findById(item.sauce);
        const cheese = await Inventory.findById(item.cheese);

        if (!base || !sauce || !cheese) {
          return res.status(404).json({
            success: false,
            message: "Invalid customized pizza",
          });
        }

        itemPrice +=
          base.price +
          sauce.price +
          cheese.price;

        const vegetables = await Inventory.find({
          _id: {
            $in: item.vegetables || [],
          },
        });

        vegetables.forEach((veg) => {
          itemPrice += veg.price;
        });

        // Reduce Stock

        await Inventory.findByIdAndUpdate(base._id, {
          $inc: { stock: -item.quantity },
        });

        await Inventory.findByIdAndUpdate(sauce._id, {
          $inc: { stock: -item.quantity },
        });

        await Inventory.findByIdAndUpdate(cheese._id, {
          $inc: { stock: -item.quantity },
        });

        for (const veg of vegetables) {
          await Inventory.findByIdAndUpdate(veg._id, {
            $inc: { stock: -item.quantity },
          });
        }
      }

      itemPrice *= item.quantity;

      totalAmount += itemPrice;

      orderItems.push({
        pizza: pizza._id,
        base: item.base || null,
        sauce: item.sauce || null,
        cheese: item.cheese || null,
        vegetables: item.vegetables || [],
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      deliveryDetails,
      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
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
      message: error.message,
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  placeCODOrder
};