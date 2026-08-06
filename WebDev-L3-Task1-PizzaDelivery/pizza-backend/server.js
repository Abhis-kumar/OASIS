require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./src/config/db");
const { initializeSocket } = require("./src/socket");

// Routes
const otpRoutes = require("./src/routes/otpRoutes");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const pizzaRoutes = require("./src/routes/pizzaRoutes");
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const paymentRoutes = require("./src/routes/paymentRoutes");

const userRoutes = require("./src/routes/userRoutes")

const app = express();
const server = http.createServer(app);


const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD,
];

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// Initialize Socket
initializeSocket(io);

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // User joins their personal room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Pizza Delivery API Running...",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.use("/api/users", userRoutes);
app.use("/api/otp", otpRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});