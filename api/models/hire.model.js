import mongoose from "mongoose";

const hireSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    referenceWebsite: {
      type: String,
      default: "",
    },
    pages: {
      type: Number,
      default: 1,
    },
    deadline: {
      type: String, // or Date, if you're using a date picker
      default: "",
    },
    budget: {
      type: String,
      default: "",
    },
    preferredCommunication: {
      type: String,
      default: "Email",
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const HireRequest = mongoose.model("HireRequest", hireSchema);

export default HireRequest;
