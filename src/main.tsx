import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { updatePWAIcon } from './pwa-icon';

updatePWAIcon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Progressive Web App (PWA) Service Worker
if (false && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('PWA Service Worker registered successfully: ', registration.scope);
      })
      .catch(err => {
        console.error('PWA Service Worker registration failed: ', err);
      });
  });
}


// Unregister old Service Workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
}
