import mongoose from "mongoose" // load mongoose library
import userSchema from "./schema.js" // load users schema

const model = mongoose.model("UserModel", userSchema) // create mongoose model from the schema
export default model // export so it can be used elsewhere
