import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'

const initializeApp = () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App />)
}

document.addEventListener('DOMContentLoaded', initializeApp);
