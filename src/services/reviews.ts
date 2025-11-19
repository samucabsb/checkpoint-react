import api from '@/lib/api';

export interface Review {
  id_avaliacao: number;
  id_jogo: number;
  id_usuario: number;
  nota: number;
  comentario: string;
  dt_avaliacao: string;
  nm_usuario?: string;
  nm_jogo?: string;
}

export interface CreateReviewData {
  id_jogo: number;
  id_usuario: number;
  nota: number;
  comentario: string;
}

export const reviewsService = {
  async getAll(): Promise<Review[]> {
    const response = await api.get<Review[]>('/api/avaliacoes');
    return response.data;
  },

  async getByGame(gameId: number): Promise<Review[]> {
    const response = await api.get<Review[]>(`/api/avaliacoes/jogo/${gameId}`);
    return response.data;
  },

  async create(data: CreateReviewData): Promise<Review> {
    const response = await api.post<Review>('/api/avaliacoes', data);
    return response.data;
  },

  async update(id: number, data: { nota?: number; comentario?: string }): Promise<Review> {
    const response = await api.put<Review>(`/api/avaliacoes/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/avaliacoes/${id}`);
  },
};
