import Database from "../Database/index.js"
export default function AssignmentRoutes(app) {
  //- Update a assignment
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params
    const assignmentIndex = Database.assignments.findIndex((a) => a._id === aid)

    if (assignmentIndex !== -1) {
      // Check if the assignment was found
      Database.assignments[assignmentIndex] = {
        ...Database.assignments[assignmentIndex],
        ...req.body,
      }
      res.sendStatus(204) // No Content
    } else {
      res.status(404).send("Assignment not found") // Assignment not found
    }
  })

  // app.put("/api/assignments/:aid", (req, res) => {
  //   const { aid } = req.params
  //   const assignmentIndex = Database.assignments.indexOf((a) => a._id === aid)
  //   Database.assignments[assignmentIndex] = {
  //     ...Database.assignments[assignmentIndex],
  //     ...req.body,
  //   }
  //   res.sendStatus(204)
  // })

  //- Delete a assignment
  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params
    const assignmentToDelete = Database.assignments.find((a) => a._id === aid)
    if (!assignmentToDelete) {
      res.status(404).json({ message: `Unable to delete the assignmentToDelete with ID: ${aid}` })
    }
    Database.assignments.splice(Database.assignments.indexOf(assignmentToDelete), 1)
    res.sendStatus(200)
  })

  //- Create a new assignment
  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    }
    Database.assignments.push(newAssignment)
    res.send(newAssignment)
  })

  //- Get assignments
  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params
    const assignments = Database.assignments.filter((a) => a.course === cid)
    res.send(assignments)
  })

  //- Get All assignments in the database
  app.get("/api/assignments", (req, res) => {
    res.send(Database.assignments)
  })
}
