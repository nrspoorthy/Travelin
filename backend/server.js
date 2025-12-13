import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectdb from "./config/db.js";

// ROUTES
import destinationRoutes from "./routes/destinationRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";  

dotenv.config();

// Connect to DB
connectdb();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());   

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,   
  })
);

// Default route
app.get("/", (req, res) => {
  res.send("TravelIn Backend Running");
});

// API Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);  
// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
