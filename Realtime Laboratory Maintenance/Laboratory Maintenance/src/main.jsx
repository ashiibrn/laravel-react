import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './contexts/contextprovider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal.js';
import 'bootstrap';
import './user.css';
import './tech.css';
import './admin.css';
import router from './router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
    <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>
)
