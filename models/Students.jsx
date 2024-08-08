import mongoose from "mongoose";
const StudentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  standard: {
    type: Number,
    min: 1,
    max: 10,
    required: true,
  },
  tamil: {
    type: Number,
    required: true,
  },
  english: {
    type: Number,
    required: true,
  },
  maths: {
    type: Number,
    required: true,
  },
  science: {
    type: Number,
    required: true,
  },
  social_science: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  average: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

const Students =
  mongoose.models.students || mongoose.model("students", StudentsSchema);

export default Students;
