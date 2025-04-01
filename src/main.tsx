import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RobotoContextProvider from './context/RobotoContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RobotoContextProvider>
      <App />
    </RobotoContextProvider>
  </StrictMode>
);
