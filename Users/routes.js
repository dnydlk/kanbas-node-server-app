import * as dao from "./dao.js"

export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body)
    res.json(user)
  }

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId)
    res.json(status)
  }

  const findAllUsers = async (req, res) => {
    const { role } = req.query
    if (role && role !== "ALL") {
      const users = await dao.findUserByRole(role)
      return res.json(users)
    }
    const users = await dao.findAllUsers()
    res.json(users)
  }

  const findUserById = async (req, res) => {
    const { userId } = req.params
    const user = await dao.findUserById(userId)
    if (user) {
      res.json(user)
    } else {
      res.json({ error: "User not found" })
    }
  }

  const updateUser = async (req, res) => {
    const { userId } = req.params
    const status = await dao.updateUser(userId, req.body)
    req.session.currentUser = await dao.findUserById(userId)
    res.json(status)
    // try {
    //   const { userId } = req.params
    //   const updateResult = await dao.updateUser(userId, req.body)
    //   if (updateResult.matchedCount === 0) {
    //     return res.status(404).send("User not found")
    //   }
    //   if (updateResult.modifiedCount === 0) {
    //     return res.status(304).send("No changes made to the user.")
    //   }
    //   const updatedUser = await dao.findUserById(req.params.id) // Fetch the updated user if needed
    //   req.session.currentUser = await dao.findUserById(userId) // Update the session information
    //   res.json(updatedUser)
    // } catch (error) {
    //   console.error("Error updating user:", error)
    //   res.status(500).send("Error updating user")
    // }
  }

  const signup = async (req, res) => {
    console.log(`Checking if username ${req.body.username} exists`)
    const user = await dao.findUserByUsername(req.body.username)
    console.log(`User found: ${user}`)
    if (user) {
      console.log(`Username ${req.body.username} already taken`)
      return res.status(400).json({ message: "Username already taken" }) // Ensure to return here
    }
    try {
      const currentUser = await dao.createUser(req.body)
      req.session["currentUser"] = currentUser
      console.log("🚀 ~ signup ~ currentUser:", currentUser)
      res.json(currentUser)
    } catch (error) {
      console.error("Unexpected error during user creation", error)
      if (error.code === 11000) {
        return res.status(409).json({ message: "Username already exists." })
      } else {
        return res.status(500).json({ message: "Internal server error." })
      }
    }
  }

  const signin = async (req, res) => {
    const { username, password } = req.body
    const currentUser = await dao.findUserByCredentials(username, password)
    console.log("🚀 ~ signin ~ currentUser:", currentUser)
    if (currentUser) {
      req.session["currentUser"] = currentUser
      console.log("currentUser is the current User")
      console.log("🚀 ~ signin ~ currentUser:", currentUser)
      res.json(currentUser)
    } else {
      res.sendStatus(401)
    }
  }

  const signout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }

  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"]
    console.log("🚀 ~ profile ~ currentUser:", currentUser)
    if (!currentUser) {
      res.sendStatus(401)
      return
    }
    res.json(currentUser)
  }

  // Routes
  app.post("/api/users", createUser)
  app.get("/api/users", findAllUsers)
  app.get("/api/users/:userId", findUserById)
  app.put("/api/users/:userId", updateUser)
  app.delete("/api/users/:userId", deleteUser)
  app.post("/api/users/signup", signup)
  app.post("/api/users/signin", signin)
  app.post("/api/users/signout", signout)
  app.post("/api/users/profile", profile)
}
