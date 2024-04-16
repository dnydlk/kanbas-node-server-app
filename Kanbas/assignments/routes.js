import Database from "../Database/index.js"
import * as dao from "./dao.js"

export default function AssignmentRoutes(app) {
  //- Update a assignment
  // app.put("/api/assignments/:aid", (req, res) => {
  //   const { aid } = req.params
  //   const assignmentIndex = Database.assignments.findIndex((a) => a._id === aid)

  //   if (assignmentIndex !== -1) {
  //     // Check if the assignment was found
  //     Database.assignments[assignmentIndex] = {
  //       ...Database.assignments[assignmentIndex],
  //       ...req.body,
  //     }
  //     res.sendStatus(204) // No Content
  //   } else {
  //     res.status(404).send("Assignment not found") // Assignment not found
  //   }
  // })
  const updateAssignment = async (req, res) => {
    const { aid } = req.params
    const assignment = req.body
    const updatedAssignment = await dao.updateAssignment(aid, assignment)
    res.json(updatedAssignment)
  }

  //- Delete a assignment
  // app.delete("/api/assignments/:aid", (req, res) => {
  //   const { aid } = req.params
  //   const assignmentToDelete = Database.assignments.find((a) => a._id === aid)
  //   if (!assignmentToDelete) {
  //     res.status(404).json({ message: `Unable to delete the assignmentToDelete with ID: ${aid}` })
  //   }
  //   Database.assignments.splice(Database.assignments.indexOf(assignmentToDelete), 1)
  //   res.sendStatus(200)
  // })
  const deleteAssignment = async (req, res) => {
    const { aid } = req.params
    const deletedAssignment = await dao.deleteAssignment(aid)
    if (!deletedAssignment) {
      res.status(404).json({ message: `Unable to delete the assignment with ID: ${aid}` })
      return
    }
    res.sendStatus(200)
  }

  //- Create a new assignment
  // app.post("/api/courses/:cid/assignments", (req, res) => {
  //   const { cid } = req.params
  //   const newAssignment = {
  //     ...req.body,
  //     course: cid,
  //     _id: new Date().getTime().toString(),
  //   }
  //   Database.assignments.push(newAssignment)
  //   res.send(newAssignment)
  // })
  const createAssignment = async (req, res) => {
    const { cid } = req.params
    const assignment = {
      ...req.body,
      course: cid,
    }
    const newAssignment = await dao.createAssignment(assignment)
    res.json(newAssignment)
  }

  //- Get assignments
  // app.get("/api/courses/:cid/assignments", (req, res) => {
  //   const { cid } = req.params
  //   const assignments = Database.assignments.filter((a) => a.course === cid)
  //   res.send(assignments)
  // })
  const getAssignmentsByCourseId = async (req, res) => {
    const { cid } = req.params
    const assignments = await dao.getAssignmentsByCourseId(cid)
    res.json(assignments)
  }

  //- Get All assignments in the database
  // app.get("/api/assignments", (req, res) => {
  //   res.send(Database.assignments)
  // })
  const getAllAssignments = async (req, res) => {
    const assignments = await dao.getAllAssignments()
    res.json(assignments)
  }

  app.get("/api/courses/:cid/assignments", getAssignmentsByCourseId)
  app.get("/api/assignments", getAllAssignments)
  app.post("/api/courses/:cid/assignments", createAssignment)
  app.put("/api/assignments/:aid", updateAssignment)
  app.delete("/api/assignments/:aid", deleteAssignment)
}
