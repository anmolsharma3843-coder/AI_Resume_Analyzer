import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthInitializer from './components/AuthInitialize.jsx'
import { Provider } from "react-redux";
import { store } from './store/index.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <ThemeProvider>
      <AuthInitializer><App /></AuthInitializer>
      </ThemeProvider>
      </Provider>
      
    
  </StrictMode>,
)
