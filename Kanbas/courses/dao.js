import courseModel from "./model.js"

// CURD operations for the Course model

// CREATE
// Create a new course
export const createCourse = (course) => {
  delete course._id // remove _id field just in case client sends it
  return courseModel.create(course)
}

// UPDATE
// Update a course by id
export const updateCourse = (courseId, course) => courseModel.updateOne({ _id: courseId }, { $set: course })

// READ
// Get all courses
export const getAllCourses = () => courseModel.find()
// Get a course by id
export const getCourseById = (courseId) => courseModel.findById(courseId)
// Delete
export const deleteCourse = (courseId) => courseModel.deleteOne({ _id: courseId })
