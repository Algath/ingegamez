import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import './styles/global.css'
import '@fontsource/baloo-2/400.css'
import '@fontsource/baloo-2/600.css'
import client from './apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import ProtectedRoute from './components/ProtectedRoute';

// pages chargées à la demande (code-splitting) : la page d'accueil reste dans le bundle principal
const PixelJam = lazy(() => import('./pages/pixel-jam-2026'))
const PixelLan = lazy(() => import('./pages/pixel-lan-2025'))
const Actuality = lazy(() => import('./pages/actuality'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const Contact = lazy(() => import('./pages/contact'))
const Gallery = lazy(() => import('./pages/gallery'))
const Admin = lazy(() => import('./pages/admin'))
const Events = lazy(() => import('./pages/admin/events'))
const News = lazy(() => import('./pages/admin/news'))
const GalerieAdmin = lazy(() => import('./pages/admin/galerie'))
const Login = lazy(() => import('./pages/admin/login'))
const Register = lazy(() => import('./pages/register'))
const AdminGames = lazy(() => import('./pages/admin/games'))
const Games = lazy(() => import('./pages/games'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={null}>
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
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)