import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';

import './index.css' // Ini penting

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
