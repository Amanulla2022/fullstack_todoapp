import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const filterTodos = (todos) => {
    let filteredTodos = todos;

    if (filter === "completed") {
      filteredTodos = todos.filter((todo) => todo.completed);
    } else if (filter === "not_completed") {
      filteredTodos = todos.filter((todo) => !todo.completed);
    }

    return filteredTodos.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todo/tasks`, {
        withCredentials: true,
      });
      setTodos(response.data.todos);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error("Invalid input! Please check your details.");
        } else if (status === 401) {
          toast.error("Unauthorized! Please log in again.");
        } else if (status === 500) {
          toast.error("Server error! Please try again later.");
        } else {
          toast.error(`An error occurred: ${data.message || "Unknown error"}`);
        }
      } else if (error.request) {
        toast.error("Network error! Please check your internet connection.");
      } else {
        toast.error(`An error occurred: ${error.message}`);
      }
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const handleUpdate = async (taskId) => {
    try {
      await axios.put(
        `${BASE_URL}/todo/${taskId}`,
        {
          title: editTask.title,
          descriptions: editTask.descriptions,
          completed: editTask.completed,
        },
        {
          withCredentials: true,
        }
      );
      fetchTodos();
      setEditTask(null);
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("An error occurred during updating task!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/todo/${taskId}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("An error occurred during updating task!");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader color="#3498db" size={50} />
        </div>
      ) : (
        <div className="w-full max-w-screen-xl mx-auto px-4">
          {todos.length > 0 ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex space-x-4 mb-4 md:mb-0">
                  <h2 className="text-xl font-bold">Filters :</h2>
                  <button
                    onClick={() => setFilter("all")}
                    className={`common-btn ${
                      filter === "all" ? "selected-btn" : "notselected-btn"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`common-btn ${
                      filter === "completed"
                        ? "selected-btn"
                        : "notselected-btn"
                    }`}
                  >
                    Completed
                  </button>
                  <button
                    onClick={() => setFilter("not_completed")}
                    className={`common-btn ${
                      filter === "not_completed"
                        ? "selected-btn"
                        : "notselected-btn"
                    }`}
                  >
                    Not Completed
                  </button>
                </div>
                <div className="flex space-x-4 mb-4 md:mb-0">
                  <h2 className="text-xl font-bold">By time :</h2>
                  <button
                    onClick={() => setSortOrder("asc")}
                    className={`common-btn ${
                      sortOrder === "asc" ? "selected-btn" : "notselected-btn"
                    }`}
                  >
                    Ascending
                  </button>
                  <button
                    onClick={() => setSortOrder("desc")}
                    className={`common-btn ${
                      sortOrder === "desc" ? "selected-btn" : "notselected-btn"
                    }`}
                  >
                    Descending
                  </button>
                </div>
              </div>
              {filterTodos(todos).map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  editTask={editTask}
                  handleEdit={handleEdit}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  setEditTask={setEditTask}
                />
              ))}
            </>
          ) : (
            <p className="text-center text-gray-500">
              No tasks available! Add new tasks!
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default TodoList;
