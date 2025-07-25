import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HealthCareProvider } from './context/HealthCareContext.jsx'
import { BrowserRouter,Route, Routes  } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HealthCareProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
  

    </HealthCareProvider>
  </StrictMode>,
)
