import React, { useState, useEffect } from 'react';
import './MoodWidget.css';

const moods = [
  { label: '😊 Happy', value: 'happy' },
  { label: '😐 Neutral', value: 'neutral' },
  { label: '😔 Sad', value: 'sad' },
  { label: '😤 Stressed', value: 'stressed' },
  { label: '😌 Calm', value: 'calm' },
];

export default function MoodWidget() {
  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem('moodToday') || '';
  });

  useEffect(() => {
    if (selectedMood) {
      localStorage.setItem('moodToday', selectedMood);
    }
  }, [selectedMood]);

  return (
    <div className="widget">
      <h2>Mood Tracker</h2>
      {moods.map((mood) => (
        <button
          key={mood.value}
          className={`mood-button ${selectedMood === mood.value ? 'selected' : ''}`}
          onClick={() => setSelectedMood(mood.value)}
        >
          {mood.label}
        </button>
      ))}
      {selectedMood && (
        <p style={{ marginTop: '1rem' }}>
          You’re feeling <strong>{moods.find((m) => m.value === selectedMood)?.label}</strong> today.
        </p>
      )}
    </div>
  );
}