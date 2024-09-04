import React from "react";
import { MdEdit, MdDelete, MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const TodoItem = ({
  todo,
  editTask,
  handleEdit,
  handleUpdate,
  handleDelete,
  setEditTask,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 mb-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
      {editTask && editTask._id === todo._id ? (
        <>
          <input
            type="text"
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            className="edit-input"
          />
          <input
            type="text"
            value={editTask.descriptions}
            onChange={(e) =>
              setEditTask({ ...editTask, descriptions: e.target.value })
            }
            className="edit-input"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editTask.completed}
              onChange={(e) =>
                setEditTask({ ...editTask, completed: e.target.checked })
              }
              className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
            />
            <span>Completed</span>
          </label>
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => handleUpdate(todo._id)}
              className="bg-blue-600 hover:bg-blue-700 task-btn"
            >
              <FaSave />
            </button>
            <button
              onClick={() => setEditTask(null)}
              className="bg-gray-600 hover:bg-gray-700 task-btn"
            >
              <MdCancel />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full md:w-1/4">
            <h2 className="text-xl font-bold mb-2">{todo.title}</h2>
            <p className="text-sm text-gray-600">{todo.descriptions}</p>
          </div>
          <p
            className={`${
              todo.completed ? "line-through text-green-500" : "text-red-500"
            } font-medium`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(todo)}
              className="bg-green-500 hover:bg-green-600 task-btn"
            >
              <MdEdit />
            </button>
            <button
              onClick={() => handleDelete(todo._id)}
              className="bg-red-500 hover:bg-red-600 task-btn"
            >
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
