import mongoose, { Schema } from "mongoose"

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    lessons: [
      {
        name: String,
        description: String,
        module: Schema.Types.ObjectId,
      },
    ],
  },
  { collection: "modules" }
)
export default moduleSchema
