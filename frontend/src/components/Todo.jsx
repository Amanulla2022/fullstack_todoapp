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
    if (!input.title && !input.descriptions) {
      toast.error("Fill all the details!");
      return;
    }

    if (!input.title) {
      toast.error("Please enter title for task!");
      return;
    }

    if (!input.descriptions) {
      toast.error("Please enter description for task!");
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
      <h1 className="text-4xl font-bold mb-2 uppercase shadow-lg">
        ToDo Tasks!
      </h1>
      <form
        onSubmit={submitForm}
        className="flex flex-row gap-4 items-center mb-4"
      >
        <input
          type="text"
          name="title"
          value={input.title}
          onChange={changeEventHandler}
          placeholder="Title"
          className="w-1/4 todo-input"
        />
        <input
          type="text"
          name="descriptions"
          value={input.descriptions}
          onChange={changeEventHandler}
          placeholder="Descriptions"
          className="md:w-2/3 w-1/2 todo-input"
        />
        <button className="w-1/5 md:1/4 bg-black text-white items-center py-2 px-2 rounded-lg">
          Add
        </button>
      </form>
    </div>
  );
};

export default Todo;
