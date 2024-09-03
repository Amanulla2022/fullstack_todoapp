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

  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todo/tasks`, {
        withCredentials: true,
      });
      console.log(response.data.todos);
      setTodos(response.data.todos);
    } catch (error) {
      console.log(`Error ${error}`);
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
        <ClipLoader color="#3498db" className="h-16 w-16" />
      ) : (
        <div className="w-full max-w-screen-xl mx-auto">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                editTask={editTask}
                handleEdit={handleEdit}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                setEditTask={setEditTask}
              />
            ))
          ) : (
            <p className="text-center">No task added add new tasks!</p>
          )}
        </div>
      )}{" "}
    </>
  );
};

export default TodoList;
