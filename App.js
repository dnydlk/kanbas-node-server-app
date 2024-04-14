// common JS (older syntax): const express = require("express")
import express from "express" // newer ES6 syntax
import mongoose from "mongoose" // import mongoose
import cors from "cors"
import session from "express-session"
import Hello from "./Hello.js" // import Hello from Hello.js
import Lab5 from "./Lab5.js"
import CourseRoutes from "./Kanbas/courses/routes.js"
import ModuleRoutes from "./Kanbas/modules/routes.js"
import AssignmentRoutes from "./Kanbas/assignments/routes.js"
import UserRoutes from "./Users/routes.js"
import "dotenv/config"

// Connect to the kanbas MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/kanbas")
// todo: Connect to a remote machine hosted by Mongo's Atlas could service
// create an instance of express
const app = express()
// middleware that enables CORS (Cross-Origin Resource Sharing: allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.)
app.use(
  cors({
    credentials: true, // support cookies
    // origin: "http://localhost:3000", // restrict cross-origin resource sharing to the react application
    origin: process.env.FRONTEND_URL,
  })
)
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  }
}
app.use(session(sessionOptions))

// middleware that parses JSON
app.use(express.json())

// Routes
UserRoutes(app)

AssignmentRoutes(app)
ModuleRoutes(app)
CourseRoutes(app)

Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)
