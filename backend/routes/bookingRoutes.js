import express from "express";
import TourBooking from "../models/TourBooking.js";
import DestinationBooking from "../models/DestinationBooking.js";
import Destination from "../models/Destination.js";
import Tours from "../models/Tours.js";
import mongoose from "mongoose";

const router = express.Router();




router.post("/tour", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address1,
      address2,
      tourId,
      persons,
      amountINR,
    } = req.body;

    // ✅ Validate required fields
    if (!tourId) {
      return res.status(400).json({
        success: false,
        message: "tourId is required",
      });
    }

    if (!persons || persons <= 0) {
      return res.status(400).json({
        success: false,
        message: "persons is required",
      });
    }

    // ✅ FIND TOUR (NO DESTINATION CHECK)
    const tour = await Tours.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // ✅ CREATE BOOKING
    const booking = await TourBooking.create({
      userName: `${firstName} ${lastName}`,
      email,
      phone,
      country,
      city,
      address1,
      address2,

      tourId: tour._id,
      persons,
      totalPrice: amountINR,

      bookingStatus: "Confirmed",
      paymentStatus: "Unpaid",
    });

    return res.status(201).json({
      success: true,
      message: "Tour booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ Tour Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



router.post("/destination", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      address1,
      address2,
      destinationId,
      tourId,
      amountUSD,
      amountINR,
    } = req.body;

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "destinationId is required",
      });
    }

    const destination = await Destination.findById(destinationId);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Invalid destination",
      });
    }

 
    const tour = destination.tours.find(
      (t) => String(t.id) === String(tourId)
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Invalid tour",
      });
    }

    const booking = await DestinationBooking.create({
      userName: `${firstName} ${lastName}`,
      email,
      phone,
      country,
      city,
      address1,
      address2,

      destinationId,
      destinationName: destination.name,

      tourId: tour.id,
      tourName: tour.name,

      amountUSD,
      amountINR,
      totalPrice: amountINR,

      bookingStatus: "Confirmed",
    });

    res.status(201).json({
      success: true,
      message: "Destination booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Destination Booking Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.get("/status", async (req, res) => {
  try {
    const tourBookings = await TourBooking.find().populate("tourId");
    const destinationBookings = await DestinationBooking.find()
      .populate("destinationId");

    const bookings = [
      ...tourBookings.map((b) => ({
        ...b._doc,
        bookingType: "Tour",
      })),
      ...destinationBookings.map((b) => ({
        ...b._doc,
        bookingType: "Destination",
      })),
    ];

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    let booking =
      (await TourBooking.findByIdAndUpdate(
        req.params.id,
        { bookingStatus: status },
        { new: true }
      )) ||
      (await DestinationBooking.findByIdAndUpdate(
        req.params.id,
        { bookingStatus: status },
        { new: true }
      ));

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;
