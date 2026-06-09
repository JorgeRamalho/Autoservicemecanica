import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { seedDemoUser } from './services/authService';
import '../css3/style.css';

void seedDemoUser();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
