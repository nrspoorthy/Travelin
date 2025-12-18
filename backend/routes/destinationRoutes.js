import express from "express";
import Destination from "../models/Destination.js"; 



const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/",async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/destination/:id/review", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const newReview = {
      user,
      rating,
      comment,
      date: new Date()
    };

    // FIX 2: destination uses "experiences", not "reviews"
    destination.experiences.push(newReview);

    // Recalculate average rating
    const total = destination.experiences.reduce((sum, r) => sum + r.rating, 0);
    destination.rating = (total / destination.experiences.length).toFixed(1);
    destination.totalReviews = destination.experiences.length;

    await destination.save();

    // FIX 3: return the updated experiences list
    res.status(201).json({
      message: "Review added successfully",
      reviews: destination.experiences
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
