import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import PixelJam from './pages/pixel-jam-2026'
import PixelLan from './pages/pixel-lan-2025'
import Actuality from './pages/actuality'
import PostDetail from './pages/PostDetail'
import Contact from './pages/contact'
import Gallery from './pages/gallery'
import Admin from './pages/admin'
import Events from './pages/admin/events'
import News from './pages/admin/news'
import GalerieAdmin from './pages/admin/galerie'
import Login from './pages/admin/login'
import Register from './pages/register'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pixel-jam-2026" element={<PixelJam />} />
        <Route path="/pixel-lan-2025" element={<PixelLan />} />
        <Route path="/actuality" element={<Actuality />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login/admin" element={<Admin />} />
        <Route path="/admin/events" element={<Events />} />
        <Route path="/admin/news" element={<News />} />
        <Route path="/admin/galerie" element={<GalerieAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)