// App.jsx
import React, { useState, useEffect } from 'react';
import TaskWidget from './components/TaskWidget';
import WeatherWidget from './components/WeatherWidget';
import DateTimeWidget from './components/DateTimeWidget';
import MoodWidget from './components/MoodWidget';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <div className="container">
      <header>
        <h1>Smart Dashboard</h1>
        <button onClick={() => setDarkMode((prev) => !prev)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>

      <div className="column">
        <DateTimeWidget />
      </div>
      <div className="row widgets-row">
        <WeatherWidget />
        <TaskWidget />
        <MoodWidget />
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
}