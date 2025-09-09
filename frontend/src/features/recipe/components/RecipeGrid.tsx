import type { RecipeGridProps, Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

const RecipeGrid = ({ recipes, onRecipeClick }: RecipeGridProps) => {
  const handleRecipeClick = (recipe: Recipe) => {
    onRecipeClick?.(recipe);
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍳</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          아직 레시피가 없습니다
        </h3>
        <p className="text-gray-500">
          첫 번째 레시피를 추가해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => handleRecipeClick(recipe)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
