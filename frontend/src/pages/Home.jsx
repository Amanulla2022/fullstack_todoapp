import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Todo from "../components/Todo";
import TodoList from "../components/TodoList";

const Home = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskAdded = () => {
    setRefresh(!refresh);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Navbar />
        <Todo onTaskAdded={handleTaskAdded} />
        <TodoList key={refresh} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
