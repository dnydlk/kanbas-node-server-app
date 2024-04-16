import moduleModel from "./model.js"

// CURD operations for the Module model

// CREATE
// Create a new module
export const createModule = (module) => {
  delete module._id // remove _id field just in case client sends it
  return moduleModel.create(module)
}

// UPDATE
// Update a module by id
export const updateModule = (moduleId, module) => moduleModel.updateOne({ _id: moduleId }, { $set: module })

// READ
// Get modules by course id
export const getModulesByCourseId = (courseId) => moduleModel.find({ course: courseId })
// Get all modules
export const getAllModules = () => moduleModel.find()
// Get a module by id
export const getModuleById = (moduleId) => moduleModel.findById(moduleId)

// Delete
export const deleteModule = (moduleId) => moduleModel.deleteOne({ _id: moduleId })
