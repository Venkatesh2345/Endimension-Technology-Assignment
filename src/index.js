import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { ArrayProvider } from './Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ArrayProvider>
      <RouterProvider router={router} >
        <App />
      </RouterProvider>
    </ArrayProvider>
  </React.StrictMode>
);
