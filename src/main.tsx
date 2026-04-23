import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Importando o CSS global!
import './App.css'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);