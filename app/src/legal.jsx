import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LegalPage from './components/Legal'
import './fonts.css'
import './styles.css'

const page = document.body.dataset.page
createRoot(document.getElementById('root')).render(
  <StrictMode><LegalPage page={page} /></StrictMode>
)
