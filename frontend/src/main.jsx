
import { createRoot } from 'react-dom/client'
import './index.css'
import { Hero } from './pages/Hero'
import Navbar from './components/navbar'
import { BrowserRouter, Routes, Route } from "react-router";
import ResumeAnalysis from './pages/ResumeAnalysis';
import Dashboard from './pages/Dashboard';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="analyse" element={<ResumeAnalysis />} />
        <Route path='*' element={<h1>404 page</h1>} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>

  </>
)
