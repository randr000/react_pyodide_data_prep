import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { PyodideContextWrapper } from './context/PyodideContext.jsx';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Button from './component/Button.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PyodideContextWrapper>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PyodideContextWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
