// src/services/usuariosService.js
import api from './api'

export async function getUsuarios() {
  return api.get('/api/usuarios').then(res => res.data)
}

export async function getUsuarioById(id) {
  return api.get(`/api/usuarios/${id}`).then(res => res.data)
}

export async function atualizarUsuario(id, payload) {
  // payload opcional { nm_usuario, email_usuario }
  return api.put(`/api/usuarios/${id}`, payload).then(res => res.data)
}

export async function deletarUsuario(id) {
  return api.delete(`/api/usuarios/${id}`).then(res => res.data)
}
