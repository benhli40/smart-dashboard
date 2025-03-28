import React from 'react';
import './TaskWidget.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Benjamin Liles. Built with ❤️</p>
    </footer>
  );
}