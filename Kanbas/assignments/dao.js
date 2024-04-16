import assignmentModel from "./model.js"

// CURD operations for the Assignment model

// CREATE
// Create a new assignment
export const createAssignment = (assignment) => {
  delete assignment._id // remove _id field just in case client sends it
  return assignmentModel.create(assignment)
}

// UPDATE
// Update an assignment by id
export const updateAssignment = (assignmentId, assignment) =>
  assignmentModel.updateOne({ _id: assignmentId }, { $set: assignment })

// READ
// Get assignments by module id
export const getAssignmentsByCourseId = (courseId) => assignmentModel.find({ course: courseId })
// Get all assignments
export const getAllAssignments = () => assignmentModel.find()
// Get an assignment by id
export const getAssignmentById = (assignmentId) => assignmentModel.findById(assignmentId)

// Delete
export const deleteAssignment = (assignmentId) => assignmentModel.deleteOne({ _id: assignmentId })
