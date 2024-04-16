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
// Load environment variables from the .env file
import "dotenv/config"

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// Connect to the kanbas MongoDB database
mongoose.connect(CONNECTION_STRING)
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
ModuleRoutes(app)
CourseRoutes(app)
AssignmentRoutes(app)

Hello(app)
Lab5(app)

app.get("/debug/session", (req, res) => {
  console.log(req.session) // Logs the entire session object
  res.send("Session data logged to the server console.")
})
app.get("/api/session", (req, res) => {
  if (req.session) {
    res.json(req.session)
  } else {
    res.status(404).send("No session available")
  }
})

app.listen(process.env.PORT || 4000)
