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
import AdminGames from './pages/admin/games'
import Games from './pages/games'
import './styles/global.css'
import client from './apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import ProtectedRoute from './components/ProtectedRoute';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pixel-jam-2026" element={<PixelJam />} />
          <Route path="/pixel-lan-2025" element={<PixelLan />} />
          <Route path="/actuality" element={<Actuality />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path="/admin/galerie" element={<ProtectedRoute><GalerieAdmin /></ProtectedRoute>} />
          <Route path="/admin/games" element={<ProtectedRoute><AdminGames /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)