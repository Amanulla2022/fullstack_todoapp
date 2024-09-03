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
    <div className="flex justify-evenly items-center bg-gray-100 p-4 mb-2 rounded-xl shadow-xl">
      {editTask && editTask._id === todo._id ? (
        <>
          <input
            type="text"
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            value={editTask.descriptions}
            onChange={(e) =>
              setEditTask({ ...editTask, descriptions: e.target.value })
            }
            className="border rounded p-2"
          />
          <label>
            Completed:
            <input
              type="checkbox"
              checked={editTask.completed}
              onChange={(e) =>
                setEditTask({ ...editTask, completed: e.target.checked })
              }
              className="ml-2"
            />
          </label>
          <button
            onClick={() => handleUpdate(todo._id)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            <FaSave />
          </button>
          <button
            onClick={() => setEditTask(null)}
            className="bg-gray-500 text-white p-2 rounded ml-2"
          >
            <MdCancel />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold">{todo.title}</h2>
          <p>{todo.descriptions}</p>
          <p
            className={`${
              todo.completed ? "line-through text-red-500" : "text-green-500"
            }`}
          >
            {todo.completed ? "Completed" : "Not Completed"}
          </p>
          <button
            onClick={() => handleEdit(todo)}
            className="bg-green-500 text-white p-2 rounded"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => handleDelete(todo._id)}
            className="bg-red-500 text-white p-2 rounded ml-2"
          >
            <MdDelete />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
