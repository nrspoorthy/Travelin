import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  gallery: [{ type: String }],
  attractions: [{ type: String }],
  tours: [
    {
      id: { type: Number },
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      duration: { type: String },
      totalSeats: { type: Number },
      membersBooked: { type: Number },
      availableSeats: { type: Number },
      rating: { type: Number },
    },
  ],
  experiences: [
    {
      user: { type: String },
      title: { type: String },
      description: { type: String },
      photos: [{ type: String }],
      tags: [{ type: String }],
      rating: { type: Number },
      date: { type: String },
    },
  ],
});

export default mongoose.model("Destination", destinationSchema);
