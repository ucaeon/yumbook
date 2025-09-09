import type { Recipe } from '../types/recipe';

const API_BASE_URL = 'http://localhost:8080/api';

export const recipeService = {
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(`${API_BASE_URL}/recipes`);
    
    if (!response.ok) {
      throw new Error('레시피 목록을 불러오는데 실패했습니다.');
    }
    
    const result = await response.json();
    return result.data;
  },

  async getRecipeById(id: number): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
    
    if (!response.ok) {
      throw new Error('레시피를 불러오는데 실패했습니다.');
    }
    
    const result = await response.json();
    return result.data;
  },

  async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    
    if (!response.ok) {
      throw new Error('레시피 생성에 실패했습니다.');
    }
    
    const result = await response.json();
    return result.data;
  },

  async updateRecipe(id: number, recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    
    if (!response.ok) {
      throw new Error('레시피 수정에 실패했습니다.');
    }
    
    const result = await response.json();
    return result.data;
  },

  async deleteRecipe(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('레시피 삭제에 실패했습니다.');
    }
  }
};
