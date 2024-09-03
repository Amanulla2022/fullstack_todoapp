import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/baseUrl";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-evenly items-center bg-gray-100 p-4 mb-2 rounded-xl shadow-xl"
          >
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p>{todo.descriptions}</p>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        ))
      ) : (
        <p>No task added add new tasks!</p>
      )}
    </div>
  );
};

export default TodoList;
