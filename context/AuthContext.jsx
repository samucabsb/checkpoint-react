import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('usuario')

    if (token && storedUser) {
      setUsuario(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, senha) => {
    try {
      const res = await api.post('/api/auth/login', {
        email_usuario: email,
        senha_usuario: senha
      })
      const { token, usuario } = res.data

      localStorage.setItem('token', token)
      localStorage.setItem('usuario', JSON.stringify(usuario))
      setUsuario(usuario)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.erro || 'Erro no login' }
    }
  }

  const registrar = async (nome, email, senha) => {
    try {
      await api.post('/api/auth/registrar', {
        nm_usuario: nome,
        email_usuario: email,
        senha_usuario: senha
      })
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data?.erro || 'Erro ao registrar' }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ usuario, login, registrar, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
