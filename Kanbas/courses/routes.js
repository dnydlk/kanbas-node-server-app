import * as dao from "./dao.js"

export default function CourseRoutes(app) {
  //- Get a course by ID
  const getCourseById = async (req, res) => {
    const { cid } = req.params
    const course = await dao.getCourseById(cid)
    if (!course) {
      res.status(404).json({ message: `Course not found with ID: ${cid}` })
      return
    }
    res.json(course)
  }

  //- Update a course
  const updateCourse = async (req, res) => {
    const { id } = req.params
    const course = req.body
    const updatedCourse = await dao.updateCourse(id, course)
    res.json(updatedCourse)
  }

  //- Delete a course
  const deleteCourse = async (req, res) => {
    const { cid } = req.params
    const deletedCourse = await dao.deleteCourse(cid)
    if (!deletedCourse) {
      res.status(404).json({ message: `Unable to delete the course with ID: ${cid}` })
      return
    }
    res.sendStatus(200)
  }

  //- Create new course
  const createCourse = async (req, res) => {
    const course = req.body
    const newCourse = await dao.createCourse(course)
    res.json(newCourse)
  }

  //- Get all courses
  const getAllCourses = async (req, res) => {
    const courses = await dao.getAllCourses()
    res.json(courses)
  }

  // Routes
  app.get("/api/courses", getAllCourses)
  app.post("/api/courses", createCourse)
  app.put("/api/courses/:id", updateCourse)
  app.delete("/api/courses/:cid", deleteCourse)
  app.get("/api/courses/:cid", getCourseById)
}
