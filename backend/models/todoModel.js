const mongoose = require("mongoose");

// creating a todo model schema
const todoModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model("ToDo", todoModel);

module.exports = ToDo;
