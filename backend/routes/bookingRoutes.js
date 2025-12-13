import express from "express";
import TourBooking from "../models/TourBooking.js";
import DestinationBooking from "../models/DestinationBooking.js";

const router = express.Router();



// Create Tour Booking
router.post("/tour", async (req, res) => {
  try {
    const booking = new TourBooking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Tour booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});



// Create Destination Booking
router.post("/destination", async (req, res) => {
  try {
    const booking = new DestinationBooking(req.body);
    await booking.save();

    res.status(201).json({
      success: true,
      message: "Destination booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});



router.get("/status", async (req, res) => {
  try {
    const tourBookings = await TourBooking.find().populate("tourId");
    const destinationBookings = await DestinationBooking.find().populate("destinationId");

    res.json({
      success: true,
      tourBookings,
      destinationBookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


/* =====UPDATE BOOKING STATUS=== */

router.patch("/bookings/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await TourBooking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
