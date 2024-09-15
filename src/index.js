import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

const initializeApp = () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App />)
}

document.addEventListener('DOMContentLoaded', initializeApp);
