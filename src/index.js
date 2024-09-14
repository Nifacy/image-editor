import React from 'react';
import { createRoot } from 'react-dom/client';
import ImageEditor from './ImageEditor';

const initializeApp = () => {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<ImageEditor />);
}

document.addEventListener('DOMContentLoaded', initializeApp);
