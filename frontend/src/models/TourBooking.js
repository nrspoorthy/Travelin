import mongoose from "mongoose";

const tourBookingSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tours",
    required: true
  },

  persons: { type: Number, required: true },
  totalPrice: { type: Number, required: true },

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending"
  },

  paymentStatus: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model(" mongoose.models.User ||", tourBookingSchema);
