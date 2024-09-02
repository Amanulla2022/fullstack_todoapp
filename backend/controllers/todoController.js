const ToDo = require("../models/todoModel");

// function to create a todo task
const createToDoTasks = async (req, res) => {
  try {
    const { title, descriptions } = req.body;

    if (!title || !descriptions) {
      return res.status(400).json({
        message: "Something is missing, Please fill all the details",
        success: false,
      });
    }

    // creating a new todo
    const newToDo = await ToDo.create({
      title,
      descriptions,
      user: req.user.userId,
    });

    // success response
    return res.status(200).json({
      message: "ToDO task created successfully!",
      success: true,
      todo: newToDo,
    });
  } catch (error) {
    // failure response
    return res
      .status(500)
      .json({ message: "An error occurred!", success: false });
  }
};

// function to get all todo tasks by userId
const getToDos = async (req, res) => {
  try {
    // find todos by the userId
    const todos = await ToDo.find({ user: req.user.userId });

    // success response
    return res.status(200).json({
      message: "ToDos fetched successfully!",
      success: true,
      todos,
    });
  } catch (error) {
    // failure response
    return res.status(500).json({
      message: "An error occurred!",
      success: false,
    });
  }
};

const updateToDo = async (req, res) => {
  try {
    const { taskId } = req.params; // get task id from url
    const { title, descriptions, completed } = req.body; // get title, descriptions, completed from request body

    // find the todo task and update that one
    const updatedToDo = await ToDo.findOneAndUpdate(
      { _id: taskId, user: req.user.userId },
      { title, descriptions, completed },
      { new: true }
    );

    // if todo not found
    if (!updatedToDo) {
      return res.status(404).json({
        message: "ToDo not found!",
        success: false,
      });
    }

    // success response
    return res.status(200).json({
      message: "ToDo updated successfully!",
      success: true,
      todo: updatedToDo,
    });
  } catch (error) {
    // failure response
    return res.status(500).json({
      message: "An error occurred!",
      success: false,
    });
  }
};

const deleteToDo = async (req, res) => {
  try {
    const { taskId } = req.params; // get task id from url

    // find the todo task and delete that one
    const deletedToDo = await ToDo.findOneAndDelete({
      _id: taskId,
      user: req.user.userId,
    });

    // if todo not found
    if (!deletedToDo) {
      return res.status(404).json({
        message: "ToDo not found!",
        success: false,
      });
    }

    // success response
    return res.status(200).json({
      message: "ToDo deleted successfully!",
      success: true,
    });
  } catch (error) {
    // failure response
    return res.status(500).json({
      message: "An error occurred!",
      success: false,
    });
  }
};

module.exports = { createToDoTasks, getToDos, updateToDo, deleteToDo };
