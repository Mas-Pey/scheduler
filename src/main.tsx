import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { MyMonthlyNav } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyMonthlyNav />
  </StrictMode>,
)
