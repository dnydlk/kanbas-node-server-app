import * as dao from "./dao.js"

export default function QuizRoutes(app) {
  //- Update a quiz
  const updateQuiz = async (req, res) => {
    const { qid } = req.params
    const quiz = req.body
    const updatedQuiz = await dao.updateQuiz(qid, quiz)
    res.json(updatedQuiz)
  }

  //- Delete a quiz
  const deleteQuiz = async (req, res) => {
    const { qid } = req.params
    const deletedQuiz = await dao.deleteQuiz(qid)
    if (!deletedQuiz) {
      res.status(404).json({ message: `Unable to delete the quiz with ID: ${qid}` })
      return
    }
    res.sendStatus(200)
  }

  //- Create a new quiz
  const createQuiz = async (req, res) => {
    const { cid } = req.params
    const quiz = {
      ...req.body,
      course: cid,
    }
    const newQuiz = await dao.createQuiz(quiz)
    res.json(newQuiz)
  }

  //- Get quizzes
  const getQuizzesByCourseId = async (req, res) => {
    const { cid } = req.params
    const quizzes = await dao.getQuizzesByCourseId(cid)
    res.json(quizzes)
  }

  //- Get All quizzes in the database
  const getAllQuizzes = async (req, res) => {
    const quizzes = await dao.getAllQuizzes()
    res.json(quizzes)
  }

  //- Get a quiz by ID
  const getQuizById = async (req, res) => {
    const { qid } = req.params
    const quiz = await dao.getQuizById(qid)
    res.json(quiz)
  }

  app.get("/api/courses/:cid/quizzes", getQuizzesByCourseId)
  app.get("/api/quizzes/:qid", getQuizById)
  app.get("/api/quizzes", getAllQuizzes)
  app.post("/api/courses/:cid/quizzes", createQuiz)
  app.delete("/api/quizzes/:qid", deleteQuiz)
  app.put("/api/quizzes/:qid", updateQuiz)
}
