import { API_BASE_URL, API_ENDPOINTS } from '../constants/Api';

export interface Item {
  id: string;
  title: string;
  description: string;
}

export const api = {
  async getItems(): Promise<Item[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.items}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  async searchItems(query: string): Promise<Item[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.search}?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error('Failed to search items');
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  },
}; 