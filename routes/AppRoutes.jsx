// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home.jsx' // Novo
import Games from '../pages/Games.jsx' // Novo: Substitui index.html
import Login from '../pages/Login.jsx'
import Profile from '../pages/Profile.jsx' // perfil.html
import Lists from '../pages/Lists.jsx' // listas.html e page_lista.html
import GameDetail from '../pages/GameDetail.jsx' // game.html
import NotFound from '../pages/NotFound.jsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jogos" element={<Games />} /> {/* Rota para o Games.jsx */}
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/listas" element={<Lists />} />
      <Route path="/listas/:id" element={<Lists />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes