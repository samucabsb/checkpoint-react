// src/App.jsx
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import './styles/globals.css' // seu arquivo global de estilos

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
