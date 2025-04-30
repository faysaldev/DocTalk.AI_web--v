import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import App from './App';
import store from './redux/store';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </Router>
    </Provider>
  </React.StrictMode>
);