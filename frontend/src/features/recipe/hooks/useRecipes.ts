import { useState, useEffect } from 'react';
import type { Recipe } from '../types/recipe';
import { recipeService } from '../services/recipeService';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '레시피를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const refreshRecipes = () => {
    fetchRecipes();
  };

  return {
    recipes,
    loading,
    error,
    refreshRecipes
  };
};
