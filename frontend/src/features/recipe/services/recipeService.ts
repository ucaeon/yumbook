import type { Recipe } from '../types/recipe';
import { handleApiError, getErrorMessage } from '../../../shared/utils/errorHandler';

const API_BASE_URL = 'http://localhost:8080/api';
const DEFAULT_INGREDIENT = { id: '1', name: '', amount: '' };
const DEFAULT_INSTRUCTION = { id: '1', step: '' };

export const recipeService = {
  // 백엔드 문자열을 프론트엔드 배열로 변환하는 헬퍼 함수들
  parseIngredients(ingredientsString: string) {
    if (!ingredientsString || typeof ingredientsString !== 'string') {
      return [DEFAULT_INGREDIENT];
    }
    
    const ingredients = ingredientsString.split(',').map((ing, index) => {
      const parts = ing.trim().split(' ');
      const amount = parts.pop() || '';
      const name = parts.join(' ');
      
      return {
        id: (index + 1).toString(),
        name: name.trim(),
        amount: amount.trim(),
      };
    });
    
    return ingredients.length > 0 ? ingredients : [DEFAULT_INGREDIENT];
  },

  parseInstructions(instructionsString: string) {
    if (!instructionsString || typeof instructionsString !== 'string') {
      return [DEFAULT_INSTRUCTION];
    }
    
    const instructions = instructionsString.split('\n')
      .filter(step => step.trim())
      .map((step, index) => ({
        id: (index + 1).toString(),
        step: step.trim(),
      }));
    
    return instructions.length > 0 ? instructions : [DEFAULT_INSTRUCTION];
  },
  async getAllRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);
      
      if (!response.ok) {
        await handleApiError(response);
      }
      
      const result = await response.json();
      const recipes = result.data || result;
      
      // 백엔드에서 받은 문자열을 배열로 변환
      return recipes.map((recipe: any) => ({
        ...recipe,
        ingredients: this.parseIngredients(recipe.ingredients),
        instructions: this.parseInstructions(recipe.instructions),
      }));
    } catch (error) {
      console.error('레시피 목록 조회 실패:', error);
      throw new Error(getErrorMessage(error) || '레시피 목록을 불러오는데 실패했습니다.');
    }
  },

  async getRecipeById(id: number): Promise<Recipe> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
      
      if (!response.ok) {
        await handleApiError(response);
      }
      
      const result = await response.json();
      const recipeData = result.data || result;
      
      // 백엔드에서 받은 문자열을 배열로 변환
      return {
        ...recipeData,
        ingredients: this.parseIngredients(recipeData.ingredients),
        instructions: this.parseInstructions(recipeData.instructions),
      };
    } catch (error) {
      console.error('레시피 조회 실패:', error);
      throw new Error(getErrorMessage(error) || '레시피를 불러오는데 실패했습니다.');
    }
  },

  async createRecipe(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    try {
      // 백엔드 호환성을 위해 배열을 문자열로 변환
      const backendRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.map(ing => `${ing.name} ${ing.amount}`).join(', '),
        instructions: recipe.instructions.map(inst => inst.step).join('\n'),
      };

      const response = await fetch(`${API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendRecipe),
      });
      
      if (!response.ok) {
        await handleApiError(response);
      }
      
      const result = await response.json();
      const recipeData = result.data || result;
      
      // 백엔드에서 받은 문자열을 배열로 변환
      return {
        ...recipeData,
        ingredients: this.parseIngredients(recipeData.ingredients),
        instructions: this.parseInstructions(recipeData.instructions),
      };
    } catch (error) {
      console.error('레시피 생성 실패:', error);
      throw new Error(getErrorMessage(error) || '레시피 생성에 실패했습니다.');
    }
  },

  async updateRecipe(id: number, recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    try {
      // 백엔드 호환성을 위해 배열을 문자열로 변환
      const backendRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.map(ing => `${ing.name} ${ing.amount}`).join(', '),
        instructions: recipe.instructions.map(inst => inst.step).join('\n'),
      };

      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendRecipe),
      });
      
      if (!response.ok) {
        await handleApiError(response);
      }
      
      const result = await response.json();
      const recipeData = result.data || result;
      
      // 백엔드에서 받은 문자열을 배열로 변환
      return {
        ...recipeData,
        ingredients: this.parseIngredients(recipeData.ingredients),
        instructions: this.parseInstructions(recipeData.instructions),
      };
    } catch (error) {
      console.error('레시피 수정 실패:', error);
      throw new Error(getErrorMessage(error) || '레시피 수정에 실패했습니다.');
    }
  },

  async deleteRecipe(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        await handleApiError(response);
      }
    } catch (error) {
      console.error('레시피 삭제 실패:', error);
      throw new Error(getErrorMessage(error) || '레시피 삭제에 실패했습니다.');
    }
  }
};