import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Api } from './app/api/api.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider api={Api}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApiProvider>
  </StrictMode>,
)
