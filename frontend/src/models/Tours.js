import mongoose from "mongoose";

// Sub-schema for itinerary
const ItinerarySchema = new mongoose.Schema({
  day: String,
  title: String,
  description: String
});

// Sub-schema for reviews
const ReviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  date: Date
});

// MAIN TOUR SCHEMA
const TourSchema = new mongoose.Schema(
  {
    tourName: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    tourType: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: "$"
    },
    priceType: {
      type: String,
      default: "Per Adult"
    },
    rating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    popularityScore: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },

    images: {
      type: [String],
      required: true
    },

    shortDescription: {
      type: String,
      required: true
    },
    overview: {
      type: String,
      required: true
    },

    safety: {
      covidSafe: Boolean,
      freeCancellation: String,
      insuranceIncluded: Boolean
    },

    tourDetails: {
      groupSize: String,
      pickup: String,
      language: String,
      departureTime: String,
      returnTime: String
    },

    priceIncludes: [String],
    priceExcludes: [String],

    itinerary: [ItinerarySchema],

    mapLocation: {
      latitude: Number,
      longitude: Number
    },

    reviews: [ReviewSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Tours || mongoose.model("Tours", TourSchema);
