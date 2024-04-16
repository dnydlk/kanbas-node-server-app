import mongoose, { Schema } from "mongoose"

const assignmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    points: { type: Number, required: true },
    dueDate: { type: String, required: true },
    availableFromDate: { type: String, required: true },
    availableUntilDate: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "courses" },
  },
  { collection: "assignments" }
)
export default assignmentSchema
