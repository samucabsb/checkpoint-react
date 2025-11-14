// src/services/authService.js
import api from './api'

export async function registrar({ nm_usuario, email_usuario, senha_usuario }) {
  return api.post('/api/auth/registrar', { nm_usuario, email_usuario, senha_usuario })
}

export async function login({ email_usuario, senha_usuario }) {
  return api.post('/api/auth/login', { email_usuario, senha_usuario })
}
