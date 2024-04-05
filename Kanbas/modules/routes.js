import Database from "../Database/index.js"
export default function ModuleRoutes(app) {
  //- Update a module
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params
    const moduleIndex = Database.modules.indexOf((m) => m._id === mid)
    Database.modules[moduleIndex] = {
      ...Database.modules[moduleIndex],
      ...req.body,
    }
    res.sendStatus(204)
  })

  //- Delete a module
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params
    const moduleToDelete = Database.modules.find((m) => m._id === mid)
    if (!moduleToDelete) {
      res.status(404).json({ message: `Unable to delete the module with ID: ${mid}` })
    }
    Database.modules.splice(Database.modules.indexOf(moduleToDelete), 1)
    res.sendStatus(200)
  })

  //- Create a new module
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params
    const newModule = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    }
    Database.modules.push(newModule)
    res.send(newModule)
  })

  //- Get modules
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params
    const modules = Database.modules.filter((m) => m.course === cid)
    res.send(modules)
  })

  //- Get All modules in the database
  app.get("/api/modules", (req, res) => {
    res.send(Database.modules)
  })
}
