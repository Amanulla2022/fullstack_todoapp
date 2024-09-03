import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./../utils/baseUrl";
import { toast } from "react-toastify";

const Todo = ({ onTaskAdded }) => {
  const [input, setInput] = useState({
    title: "",
    descriptions: "",
    completed: false,
  });

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput({
      ...input,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!input.title || !input.descriptions) {
      console.log("Fill all the details!");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/todo/task`, input, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Created a task!");
      onTaskAdded();
    } catch (error) {
      toast.error("An error occurred during creating task!");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h1 className="text-4xl font-bold underline decoration-blue-600">
        ToDo Tasks!
      </h1>
      <form
        onSubmit={submitForm}
        className="form-details max-w-screen-2xl mb-4"
      >
        <div className="flex gap-4 items-center">
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={changeEventHandler}
            placeholder="Title"
            className="w-1/4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="descriptions"
            value={input.descriptions}
            onChange={changeEventHandler}
            placeholder="Descriptions"
            className="w-2/4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="checkbox"
            name="completed"
            checked={input.completed}
            onChange={changeEventHandler}
            className="mt-2"
          />
          <button className="bg-black text-white px-4 py-2 rounded-xl">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
