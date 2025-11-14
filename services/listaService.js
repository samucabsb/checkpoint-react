// src/services/listasService.js
import api from './api'

export async function getListas() {
  return api.get('/api/listas').then(res => res.data)
}

export async function getListaById(id) {
  return api.get(`/api/listas/${id}`).then(res => res.data)
}

export async function getListasPorUsuario(id_usuario) {
  return api.get(`/api/listas/usuario/${id_usuario}`).then(res => res.data)
}

export async function criarLista(payload) {
  // payload = { nm_lista, lista_jogos: [1,4,8] }
  return api.post('/api/listas', payload).then(res => res.data)
}

export async function atualizarLista(id, payload) {
  return api.put(`/api/listas/${id}`, payload).then(res => res.data)
}

export async function adicionarJogoNaLista(id_lista, id_jogo) {
  return api.post(`/api/listas/${id_lista}/jogos`, { id_jogo })
}

export async function removerJogoDaLista(id_lista, id_jogo) {
  return api.delete(`/api/listas/${id_lista}/jogos/${id_jogo}`)
}

export async function deletarLista(id) {
  return api.delete(`/api/listas/${id}`)
}
