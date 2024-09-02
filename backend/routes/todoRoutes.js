const express = require("express");
const {
  createToDoTasks,
  getToDos,
  updateToDo,
  deleteToDo,
} = require("../controllers/todoController");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

// POST Route for craeting a new ToDo task
// Protected route, requires authentication
router.post("/task", isAuthenticated, createToDoTasks);

// GET Route for getting all the todo tasks by user
// Protected route, requires authentication
router.get("/tasks", isAuthenticated, getToDos);

// PUT Route for updating a task by task ID
// Protected route, requires authentication
router.put("/:taskId", isAuthenticated, updateToDo);

// DELETE Route for updating a task by task ID
// Protected route, requires authentication
router.delete("/:taskId", isAuthenticated, deleteToDo);

module.exports = router;
