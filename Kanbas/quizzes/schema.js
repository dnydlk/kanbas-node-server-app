import mongoose, { Schema } from "mongoose"

const quizzesSchema = new mongoose.Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "courses" },
    name: { type: String, required: true },
    instructions: { type: String, required: true },

    published: { type: Boolean, required: true, default: false },
    graded: { type: Boolean, required: true, default: true },
    type: {
      type: String,
      required: true,
      default: "QUIZ",
      enum: ["QUIZ", "SURVEY"],
    },

    points: { type: Number, required: true },

    group: { type: String, required: true, default: "QUIZZES", enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"] },

    shuffle: { type: Boolean, required: true, default: true },

    hasTimeLimit: { type: Boolean, required: true, default: true },
    timeLimit: { type: Number, required: true, default: 20 },

    allowMultipleAttempts: { type: Boolean, required: true, default: false },
    multipleAttempts: { type: Number, required: true, default: 0 },

    showAnswers: {
      type: String,
      required: true,
      default: "IMMEDIATELY",
      enum: ["IMMEDIATELY", "AFTER DUE DATE", "NEVER"],
    },

    hasCode: { type: Boolean, required: true, default: false },
    code: { type: Number, required: true, default: 0 },

    oneAtATime: { type: Boolean, required: true, default: true },

    webCam: { type: Boolean, required: true, default: false },

    lockAfter: { type: Boolean, required: true, default: false },

    dueDate: { type: String, required: true },
    availableFromDate: { type: String, required: true },
    availableUntilDate: { type: String, required: true },
    questions: [],
  },
  { collection: "quizzes" }
)

export default quizzesSchema
