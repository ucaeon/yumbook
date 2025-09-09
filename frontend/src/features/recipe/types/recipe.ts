export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  difficulty: string;
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
}
