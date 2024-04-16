import * as dao from "./dao.js"

export default function ModuleRoutes(app) {
  //- Update a module
  const updateModule = async (req, res) => {
    const { mid } = req.params
    const module = req.body
    const updatedModule = await dao.updateModule(mid, module)
    res.json(updatedModule)
  }

  //- Delete a module
  const deleteModule = async (req, res) => {
    const { mid } = req.params
    const deletedModule = await dao.deleteModule(mid)
    if (!deletedModule) {
      res.status(404).json({ message: `Unable to delete the module with ID: ${mid}` })
      return
    }
    res.sendStatus(200)
  }

  //- Create a new module
  const createModule = async (req, res) => {
    const { cid } = req.params
    const module = {
      ...req.body,
      course: cid,
    }
    const newModule = await dao.createModule(module)
    res.json(newModule)
  }

  //- Get modules
  const getModulesByCourseId = async (req, res) => {
    const { cid } = req.params
    const modules = await dao.getModulesByCourseId(cid)
    res.json(modules)
  }

  //- Get All modules in the database
  const getAllModules = async (req, res) => {
    const modules = await dao.getAllModules()
    res.json(modules)
  }

  app.get("/api/courses/:cid/modules", getModulesByCourseId)
  app.get("/api/modules", getAllModules)
  app.post("/api/courses/:cid/modules", createModule)
  app.delete("/api/modules/:mid", deleteModule)
  app.put("/api/modules/:mid", updateModule)
}
