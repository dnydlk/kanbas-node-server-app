import * as dao from "./dao.js"

export default function AssignmentRoutes(app) {
  //- Update a assignment
  const updateAssignment = async (req, res) => {
    const { aid } = req.params
    const assignment = req.body
    const updatedAssignment = await dao.updateAssignment(aid, assignment)
    res.json(updatedAssignment)
  }

  //- Delete a assignment
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
  const getAssignmentsByCourseId = async (req, res) => {
    const { cid } = req.params
    const assignments = await dao.getAssignmentsByCourseId(cid)
    res.json(assignments)
  }

  //- Get All assignments in the database
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
