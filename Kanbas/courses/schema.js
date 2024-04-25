import mongoose, { Schema } from "mongoose"

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    department: { type: String },
    credit: { type: Number, required: true },
    description: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "users", required: true },
    student: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  { collection: "courses" }
)
export default courseSchema
