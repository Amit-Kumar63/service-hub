import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userAuthContext.jsx'
// import { store } from './app/store.js'
// import { Provider } from 'react-redux'

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Api } from './app/api/api.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
    <ApiProvider api={Api}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ApiProvider>
    </UserContext>
  </StrictMode>,
)
