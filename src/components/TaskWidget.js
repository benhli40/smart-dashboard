import React, { useState } from 'react';
import "./TaskWidget.css";

export default function TaskWidget() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('dashboardTasks')) || [];
  });

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = { text: task.trim(), completed: false };
    const updated = [...tasks, newTask];
    setTasks(updated);
    localStorage.setItem('dashboardTasks', JSON.stringify(updated));
    setTask('');
  };

  const toggleComplete = (index) => {
    const updated = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem('dashboardTasks', JSON.stringify(updated));
  };

  const removeTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem('dashboardTasks', JSON.stringify(updated));
  };

  return (
    <div className="widget">
      <h2>Tasks</h2>
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((t, index) => (
          <li key={index} className={t.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{t.text}</span>
            <button onClick={() => removeTask(index)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}