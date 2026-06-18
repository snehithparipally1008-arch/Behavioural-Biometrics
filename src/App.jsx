import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import Dashboard from './pages/Dashboard'
import Dataset from './pages/Dataset'
import Modalities from './pages/Modalities'
import Performance from './pages/Performance'
import EnhancedSystem from './pages/EnhancedSystem'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <ParticleBackground />
        <Navbar />
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dataset" element={<Dataset />} />
            <Route path="/modalities" element={<Modalities />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/system" element={<EnhancedSystem />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
