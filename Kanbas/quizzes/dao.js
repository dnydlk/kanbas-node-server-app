import quizModel from "./model.js"

// CURD operations for the Quiz model

// CREATE
// Create a new quiz
export const createQuiz = (quiz) => {
  delete quiz._id
  console.log("🚀 ~ createQuiz ~ quiz:", quiz)
  return quizModel.create(quiz)
}

// UPDATE
// Update a quiz by id
export const updateQuiz = (quizId, quiz) => quizModel.updateOne({ _id: quizId }, { $set: quiz })

// READ
// Get quizzes by course id
export const getQuizzesByCourseId = (courseId) => quizModel.find({ course: courseId })
// Get all quizzes
export const getAllQuizzes = () => quizModel.find()
// Get a quiz by id
export const getQuizById = (quizId) => quizModel.findById(quizId)

// Delete
export const deleteQuiz = (quizId) => quizModel.deleteOne({ _id: quizId })
