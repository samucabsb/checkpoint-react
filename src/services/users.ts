import api from '@/lib/api';
import type { User } from './auth';

export interface UpdateUserData {
  nm_usuario?: string;
  email_usuario?: string;
}

export const usersService = {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>('/api/usuarios');
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await api.get<User>(`/api/usuarios/${id}`);
    return response.data;
  },

  async update(id: number, data: UpdateUserData): Promise<User> {
    const response = await api.put<User>(`/api/usuarios/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/api/usuarios/${id}`);
  },
};
