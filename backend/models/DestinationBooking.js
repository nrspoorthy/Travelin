import mongoose from "mongoose";

const destinationBookingSchema = new mongoose.Schema({
  
  userName: { type: String, required: true },
  email: String,
  phone: String,

  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true
  },

  checkIn: Date,
  checkOut: Date,
  totalPrice: Number,

  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending"
  },

  

  title: String,
  firstName: String,
  lastName: String,

  country: String,
  city: String,
  address1: String,
  address2: String,
tourId: {
  type: Number,
  required: true
},

  destinationName: String,
  tourName: String,

  amountUSD: Number,
  amountINR: Number,

  bookingType: {
    type: String,
    default: "Destination"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("DestinationBooking", destinationBookingSchema);
