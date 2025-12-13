import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    confirmPassword: { type: String, select: false },
    googleId: { type: String },
    picture: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
