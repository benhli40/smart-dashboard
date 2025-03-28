// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("React render error:", error);
  const errorEl = document.createElement("pre");
  errorEl.textContent = error.message;
  document.body.appendChild(errorEl);
}
