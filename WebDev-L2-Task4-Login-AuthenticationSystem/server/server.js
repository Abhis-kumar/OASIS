 const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/initDB");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
       
        message: "Server is  Running "
    });
});
app.use("/api/auth", authRoutes);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});