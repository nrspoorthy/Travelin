import express from "express";
import Tours from "../models/Tours.js";


const router = express.Router();

router.post("/tour",async(req,res)=>{
    try{
        const tours = new Tours(req.body);
        await tours.save();
        res.status(201).json(tours);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
})

router.get("/tour", async (req, res) => {
  try {
    const tours = await Tours.find();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/tour/:id", async (req, res) => {
  try {
    const tour = await Tours.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// ADD REVIEW TO TOUR
router.post("/tour/:id/review", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;

    const tour = await Tours.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    const newReview = {
      user,
      rating,
      comment,
      date: new Date()
    };

    tour.reviews.push(newReview);

    // Recalculate average rating
    const total = tour.reviews.reduce((sum, r) => sum + r.rating, 0);
    tour.rating = (total / tour.reviews.length).toFixed(1);
    tour.totalReviews = tour.reviews.length;

    await tour.save();

    res.status(201).json({
      message: "Review added successfully",
      reviews: tour.reviews
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;