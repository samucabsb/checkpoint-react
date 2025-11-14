// src/services/avaliacoesService.js
import api from './api'

export async function getAvaliacoes() {
  return api.get('/api/avaliacoes').then(res => res.data)
}

export async function getAvaliacoesPorJogo(id_jogo) {
  return api.get(`/api/avaliacoes/jogo/${id_jogo}`).then(res => res.data)
}

export async function criarAvaliacao(payload) {
  // payload = { id_jogo, id_usuario, nota, comentario }
  return api.post('/api/avaliacoes', payload).then(res => res.data)
}

export async function atualizarAvaliacao(id, payload) {
  return api.put(`/api/avaliacoes/${id}`, payload).then(res => res.data)
}

export async function deletarAvaliacao(id) {
  return api.delete(`/api/avaliacoes/${id}`).then(res => res.data)
}
