// ================================
// ✅ Load Environment Variables FIRST
// ================================
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file
dotenv.config({ path: path.join(__dirname, '.env') });

// ================================
// ✅ Import packages (not database yet)
// ================================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// ================================
// ✅ Initialize App
// ================================
const app = express();

// ================================
// ✅ Global Middleware
// ================================
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ================================
// ✅ Static File Serving
// ================================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================================
// ✅ Health Check Endpoint
// ================================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🦷 K-Dental API (MySQL) is running perfectly ✅",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database: "MySQL",
  });
});

// ================================
// ✅ Database Connection + Server Start
// ================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Dynamic imports AFTER env is loaded
    const { connectDB } = await import("./config/database.js");
    const { notFound, errorHandler } = await import("./middleware/errorMiddleware.js");
    const authRoutes = (await import("./routes/auth.js")).default;
    const userRoutes = (await import("./routes/user.js")).default;
    const productsRoutes = (await import("./routes/productsMySQL.js")).default;
    const cartRoutes = (await import("./routes/cartMySQL.js")).default;
    const ordersRoutes = (await import("./routes/ordersMySQL.js")).default;
    const adminRoutes = (await import("./routes/adminMySQL.js")).default;

    // Mount routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/products", productsRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/orders", ordersRoutes);
    app.use("/api/admin", adminRoutes);

    // Error handling
    app.use(notFound);
    app.use(errorHandler);

    // Connect to database
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server Running in ${process.env.NODE_ENV || "development"} Mode`);
      console.log(`🌐 Listening on Port: ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });

    // Graceful shutdown on unhandled rejections
    process.on("unhandledRejection", (err) => {
      console.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    console.error(error);
    process.exit(1);
  }
};

startServer();
