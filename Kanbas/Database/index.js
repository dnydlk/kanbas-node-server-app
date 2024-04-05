import courses from "./courses.js"
import modules from "./modules.js"
import assignments from "./assignments.js"
import users from "./users.js"
import grades from "./grades.js"
import enrollments from "./enrollments.js"

const db = {
  courses,
  modules,
  assignments,
  users,
  enrollments,
  grades,
}

export { courses, modules, assignments, users, enrollments, grades }
export default db
