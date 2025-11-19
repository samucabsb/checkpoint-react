import api from '@/lib/api';

export interface GameList {
  id_lista: number;
  nm_lista: string;
  id_usuario: number;
  lista_jogos?: number[];
  nm_usuario?: string;
  total_jogos?: number;
  jogos?: Array<{
    id_jogo: number;
    nm_jogo: string;
    genero?: string;
    dt_jogo?: string;
    tem_imagem?: boolean;
  }>;
}

export interface CreateListData {
  nm_lista: string;
  lista_jogos: number[];
}

export const listsService = {
  async getAll(): Promise<GameList[]> {
    const response = await api.get<GameList[]>('/api/listas');
    return response.data;
  },

  async getById(id: number): Promise<GameList> {
    const response = await api.get<GameList>(`/api/listas/${id}`);
    return response.data;
  },

  async getByUser(userId: number): Promise<GameList[]> {
    const response = await api.get<GameList[]>(`/api/listas/usuario/${userId}`);
    return response.data;
  },

  async create(data: CreateListData): Promise<GameList> {
    const response = await api.post<GameList>('/api/listas', data);
    return response.data;
  },

  async update(id: number, data: { nm_lista?: string; lista_jogos?: number[] }): Promise<GameList> {
    const response = await api.put<GameList>(`/api/listas/${id}`, data);
    return response.data;
  },

  async addGame(listId: number, gameId: number): Promise<void> {
    await api.post(`/api/listas/${listId}/jogos`, { id_jogo: gameId });
  },

  async removeGame(listId: number, gameId: number): Promise<void> {
    await api.delete(`/api/listas/${listId}/jogos/${gameId}`);
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/listas/${id}`);
  },
};
