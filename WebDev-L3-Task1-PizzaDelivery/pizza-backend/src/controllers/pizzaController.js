const Pizza = require("../models/Pizza");
const cloudinary = require("../config/cloudinary");

// =========================
// Get All Pizzas
// =========================
const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ isAvailable: true });

    res.status(200).json({
      success: true,
      count: pizzas.length,
      pizzas,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Pizza By ID
// =========================
const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      pizza,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Create Pizza
// =========================
const createPizza = async (req, res) => {
  try {
    console.log("========== CREATE PIZZA ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      name,
      description,
      category,
      price,
      isAvailable,
    } = req.body;

    // Validate required fields
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let imageUrl = "";

    // Upload image to Cloudinary
    if (req.file) {
      try {
        console.log("Uploading image to Cloudinary...");

        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`;

        const uploaded = await cloudinary.uploader.upload(fileStr, {
          folder: "pizzahub",
        });

        console.log("Upload Success:");
        console.log(uploaded);

        imageUrl = uploaded.secure_url;
      } catch (err) {
        console.error("========== CLOUDINARY ERROR ==========");
        console.dir(err, { depth: null });
        console.error("======================================");

        return res.status(500).json({
          success: false,
          message: "Image upload failed",
          error: err.message,
        });
      }
    }

    // Create Pizza
    const pizza = await Pizza.create({
      name,
      description,
      category,
      price: Number(price),
      image: imageUrl,
      isAvailable:
        isAvailable === "true" || isAvailable === true,
    });

    return res.status(201).json({
      success: true,
      message: "Pizza Added Successfully",
      pizza,
    });
  } catch (err) {
    console.error("========== SERVER ERROR ==========");
    console.dir(err, { depth: null });
    console.error("==================================");

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// =========================
// Update Pizza
// =========================
const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    if (req.file) {
      try {
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`;

        const uploaded = await cloudinary.uploader.upload(fileStr, {
          folder: "pizzahub",
        });

        pizza.image = uploaded.secure_url;
      } catch (err) {
        console.error("Cloudinary Upload Error:");
        console.dir(err, { depth: null });

        return res.status(500).json({
          success: false,
          message: err.message,
          error: err,
        });
      }
    }

    pizza.name = req.body.name || pizza.name;
    pizza.description =
      req.body.description || pizza.description;
    pizza.category =
      req.body.category || pizza.category;
    pizza.price =
      Number(req.body.price) || pizza.price;

    if (req.body.isAvailable !== undefined) {
      pizza.isAvailable =
        req.body.isAvailable === "true" ||
        req.body.isAvailable === true;
    }

    await pizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza Updated Successfully",
      pizza,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Delete Pizza
// =========================
const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    await pizza.deleteOne();

    res.status(200).json({
      success: true,
      message: "Pizza Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza,
};