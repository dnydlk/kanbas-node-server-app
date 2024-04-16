import userModel from "./model.js"

// CRUD functions for user model

// CREATE
// Create a new user
export const createUser = (user) => {
  delete user._id // remove _id field just in case client sends it
  return userModel.create(user) // database will create _id for us instead
}

// UPDATE
// Update a user by id
export const updateUser = (userId, user) => userModel.updateOne({ _id: userId }, { $set: user })

// READ
// Find all users
export const findAllUsers = () => userModel.find()
// Find a user by id
export const findUserById = (userId) => userModel.findById(userId)
// Find a user by username
export const findUserByUsername = (username) => userModel.findOne({ username: username })
// Find a user by username and password
export const findUserByCredentials = (username, password) => userModel.findOne({ username, password })
// Find users by role
export const findUserByRole = (role) => userModel.find({ role: role })

// DELETE
// Delete a user by id
export const deleteUser = (userId) => userModel.deleteOne({ _id: userId })
