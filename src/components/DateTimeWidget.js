import React, { useState, useEffect } from 'react';
import "./DateTimeWidget.css";

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const day = now.toLocaleDateString(undefined, { weekday: 'long' });
  const date = now.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString();

  return (
    <div className="widget datetime-widget">
      <h2>Today</h2>
      <div className="day">{day}</div>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </div>
  );
}