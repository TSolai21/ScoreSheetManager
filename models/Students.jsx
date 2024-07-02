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
});

const Students =
  mongoose.models.students || mongoose.model("students", StudentsSchema);

export default Students;
