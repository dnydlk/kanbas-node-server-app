import mongoose, { Schema } from "mongoose" // load the mongoose library

const userSchema = new mongoose.Schema( // create the schema
  {
    // _id: String, // String field that is required and unique
    username: { type: String, required: true, unique: true }, // String field that is required and unique
    password: { type: String, required: true }, // String field that in required but not unique
    firstName: String, // String fields with no additional configurations
    lastName: String,
    email: String,
    // dob: Date, // Date field with no configurations
    dob: String,
    role: {
      type: String, // String field allowed string values
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER", // default value if not provided
    },
  },
  { collection: "users" }
)
export default userSchema // store data in "users" collection
