import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1 className="title">To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            className="task-input"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button className="add-btn" onClick={addTask}>
            Add
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li 
              key={index}
              className={'task-item ${task.completed ? "completed" : ""}'}
            >
              <span onClick={() => toggleTask(index)}>{task.text}</span>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Completed
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;