/**
 *
 * @param {import("express").Express} app
 */

const assignment = {
  id: "1",
  title: "NodeJS Assignment in the Backend",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
}

const module = {
  id: "1",
  name: "module name in the Backend",
  description: "module description",
  course: [
    {
      _id: "2",
      name: "module course name ",
      description: "module course description",
      module: "1",
    },
  ],
}

const todos = [
  { id: 1, title: "Task 1", description: "Task 1 description", due: "2024-04-01", completed: false },
  { id: 2, title: "Task 2", description: "Task 2 description", due: "2024-04-02", completed: true },
  { id: 3, title: "Task 3", description: "Task 3 description", due: "2024-04-03", completed: false },
  { id: 4, title: "Task 4", description: "Task 4 description", due: "2024-04-04", completed: true },
]

const Lab5 = (app) => {
  //- Post a new todo to todos
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body, //! grab the posted JSON date from the body of the request
      id: new Date().getTime(),
    }
    todos.push(newTodo)
    res.json(newTodo) //! respond with the NEW todo instead of the entire list
  })

  //- Update a todo
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` })
    }
    todo.title = req.body.title
    todo.description = req.body.description
    todo.due = req.body.due
    todo.completed = req.body.completed
    res.sendStatus(200)
  })

  //- Update a todo's title from todos
  app.get("/a5/todos/:id/title/:newTitle", (req, res) => {
    const { id, newTitle } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    todo.title = newTitle
    res.json(todos)
  })
  //- Update a todo's complete status from todos
  app.get("/a5/todos/:id/completed/:newCompleted", (req, res) => {
    const { id, newCompleted } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    todo.completed = newCompleted === "true" ? true : false //! Frontend returns "true"/"false"
    res.json(todos)
  })
  //- Update a todo's description from todos
  app.get("/a5/todos/:id/description/:newDescription", (req, res) => {
    const { id, newDescription } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    todo.description = newDescription
    res.json(todos)
  })
  //- Delete a todo from todos, RIGHT way
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    if (!todo) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` })
    }
    todos.splice(todos.indexOf(todo), 1)
    res.sendStatus(200)
  })
  //- Delete a todo from todos, WRONG way
  app.get("/a5/todos/:id/delete", (req, res) => {
    const { id } = req.params
    const todo = todos.find((t) => t.id === parseInt(id))
    const todoIndex = todos.indexOf(todo)
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1) // start from todoIndex, remove 1 element
    }
    res.json(todos)
  })
  //- Create new todo in todos
  app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    }
    todos.push(newTodo)
    res.json(todos)
  })
  //- Get todos
  // app.get("/a5/todos", (req, res) => {
  //   res.json(todos)
  // })
  //- Get todo by id (path parameter)
  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params
    const todo = todos.find((t) => {
      return t.id === parseInt(id)
    })
    res.json(todo)
  })
  //- Get todo by other property (query parameter)
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query
    if (completed !== undefined) {
      const completedBool = completed === "true"
      const completedTodos = todos.filter((t) => t.completed === completedBool)
      res.json(completedTodos)
      return
    }
    res.json(todos)
  })

  //- Get module
  app.get("/a5/module/", (req, res) => {
    res.json(module)
  })
  //- Get module.name
  app.get("/a5/module/name/", (req, res) => {
    res.json(module.name)
  })
  //- Modify module.name
  app.get("/a5/module/name/:newName", (req, res) => {
    const { newName } = req.params
    module.name = newName
    res.json(module)
  })
  //- Modify module.description
  app.get("/a5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params
    module.description = newDescription
    res.json(module)
  })

  //- Get assignment
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment)
  })
  //- Get assignment.title
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title)
  })
  //- Modify assignment.title
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params
    assignment.title = newTitle
    res.json(assignment)
  })
  //- Modify assignment.score
  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params
    assignment.score = newScore
    res.json(assignment)
  })
  //- Modify assignment.completed
  app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
    const { newCompleted } = req.params
    assignment.completed = newCompleted === "true" ? true : false //! Frontend returns "true"/"false"
    res.json(assignment)
  })

  //- Welcome
  app.get("/a5/welcome", (req, res) => {
    res.send("Welcome to Assignment 5")
  })

  //- Path Parameters
  //- Path Parameters - Add
  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params // retrieve as strings
    const sum = parseInt(a) + parseInt(b) // parse as int
    res.send(sum.toString()) // send back as string
  })
  //- Path Parameters - Subtract
  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params
    const sum = parseInt(a) - parseInt(b)
    res.send(sum.toString())
  })
  //- Path Parameters - Multiple
  app.get("/a5/multiple/:a/:b", (req, res) => {
    const { a, b } = req.params // retrieve as strings
    const sum = parseInt(a) * parseInt(b) // parse as int
    res.send(sum.toString()) // send back as string
  })
  //- Path Parameters - Divide
  app.get("/a5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params
    const sum = parseInt(a) / parseInt(b)
    res.send(sum.toString())
  })

  //- Query Parameters
  app.get("/a5/calculator", (req, res) => {
    // http://localhost:4000/a5/calculator?operation=add&b=2&a=1
    const { a, b, operation } = req.query
    let result = 0
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b)
        break
      case "subtract":
        result = parseInt(a) - parseInt(b)
        break
      case "multiple":
        result = parseInt(a) * parseInt(b)
        break
      case "divide":
        result = parseInt(a) / parseInt(b)
        break
      default:
        result = "Invalid operation"
    }
    res.send(result.toString())
  })
}

export default Lab5
