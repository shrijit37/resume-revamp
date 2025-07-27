
import { createRoot } from 'react-dom/client'
import './index.css'
import { Hero } from './pages/Hero'
import Navbar from './components/navbar'
import HowItWorks from './pages/HowItWorks'
createRoot(document.getElementById('root')).render(
  <>
    <Navbar />
    <Hero />
    <HowItWorks />
  </>
)
