// src/services/jogosService.js
import api from './api'

export async function getJogos(params = {}) {
  // params pode ser usado para filtros: ?genero=RPG&page=1 etc
  return api.get('/api/jogos', { params }).then(res => res.data)
}

export async function getJogoById(id) {
  return api.get(`/api/jogos/${id}`).then(res => res.data)
}

// Retorna a URL absoluta para a imagem do jogo (útil para <img src=... />)
export function getJogoImagemUrl(id) {
  // IMPORTANTE: garantir que VITE_API_URL esteja definida no .env
  const base = import.meta.env.VITE_API_URL || ''
  // Se base já terminar com /, evitamos //
  return `${base.replace(/\/$/, '')}/api/jogos/${id}/imagem`
}

export async function criarJogo(formData) {
  // formData deve ser FormData preenchida (nm_jogo, genero, classificação, img_jogo...)
  return api.post('/api/jogos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export async function atualizarJogo(id, formData) {
  return api.put(`/api/jogos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export async function deletarJogo(id) {
  return api.delete(`/api/jogos/${id}`)
}
