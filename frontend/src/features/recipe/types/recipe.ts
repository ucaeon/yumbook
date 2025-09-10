import type { DifficultyLevel } from '../constants/recipe';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

export interface Instruction {
  id: string;
  step: string;
}

export interface Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  difficulty: DifficultyLevel;
  cookingTime: string;
  servings: string;
}

export interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

export interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick?: (recipe: Recipe) => void;
  onRecipeDeleted?: () => void;
}
