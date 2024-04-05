import Database from "../Database/index.js"
export default function CourseRoutes(app) {
  //- Retrieve a course by id
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params
    const course = Database.courses.find((c) => c._id === id)
    if (!course) {
      res.status(404).send(`Course not found with ID: ${id}`)
      return
    }
    res.send(course)
  })

  //- Update a course
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params
    const course = req.body
    Database.courses = Database.courses.map((c) => (c._id === id ? { ...c, ...course } : c))
    //! HTTP 204 No Content status code indicates that a request has been successful but the client does not need to leave the current page
    res.sendStatus(204)
  })

  //- Delete a course
  // app.delete("/api/courses/:cid", (req, res) => {
  //   const { cid } = req.params
  //   Database.courses = Database.courses.filter((c) => c._id !== cid)
  //   //! HTTP 204 No Content status code indicates that a request has been successful but the client does not need to leave the current page
  //   res.sendStatus(204)
  // })
  app.delete("/api/courses/:cid", (req, res) => {
    const { cid } = req.params
    const courseToDelete = Database.courses.find((c) => c._id === cid)
    if (!courseToDelete) {
      res.status(404).json({ message: `Unable to delete the course with ID: ${id}` })
      return
    }
    Database.courses.splice(Database.courses.indexOf(courseToDelete), 1)
    res.sendStatus(200)
  })

  //- Create new course
  app.post("/api/courses", (req, res) => {
    const course = { ...req.body, _id: new Date().getTime().toString() }
    Database.courses.push(course)
    res.send(course)
  })

  //- Get courses
  app.get("/api/courses", (req, res) => {
    const course = Database.courses
    res.send(course)
  })
}
