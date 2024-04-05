// common JS (older syntax): const express = require("express")
import express from "express" // newer ES6 syntax
import cors from "cors"
import Hello from "./Hello.js" // import Hello from Hello.js
import Lab5 from "./Lab5.js"
import CourseRoutes from "./Kanbas/courses/routes.js"
import ModuleRoutes from "./Kanbas/modules/routes.js"
import AssignmentRoutes from "./Kanbas/assignments/routes.js"

// create an instance of express
const app = express()
// middleware that enables CORS (Cross-Origin Resource Sharing: allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.)
app.use(cors())
// middleware that parses JSON
app.use(express.json())

AssignmentRoutes(app)
ModuleRoutes(app)
CourseRoutes(app)

Hello(app)
Lab5(app)

app.listen(process.env.PORT || 4000)
