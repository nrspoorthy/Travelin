import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectdb from "./config/db.js";

import destinationRoutes from "./routes/destinationRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";  
import { verifyToken } from "./middleware/authMiddleware.js";



dotenv.config();


connectdb();

const app = express();


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


app.get("/", (req, res) => {
  res.send("TravelIn Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/destinations",verifyToken, destinationRoutes);
app.use("/api/tours",verifyToken, tourRoutes);
app.use("/api/bookings",verifyToken, bookingRoutes);
app.use("/api/user",verifyToken, userRoutes);  

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
