import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RecipeCardProps } from '../types/recipe';
import { cn } from '../../../shared/utils/cn';
import { DIFFICULTY_COLORS, TAG_COLORS } from '../constants/recipe';

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleClick = () => {
    onClick?.();
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    navigate(`/edit-recipe/${recipe.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    // TODO: 삭제 확인 후 레시피 삭제
    console.log('레시피 삭제:', recipe.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    return DIFFICULTY_COLORS[difficulty as keyof typeof DIFFICULTY_COLORS] || DIFFICULTY_COLORS.쉬움;
  };

  const getMainIngredients = (ingredients: string) => {
    const ingredientList = ingredients.split(',').map(ing => ing.trim());
    const mainIngredients = ingredientList.slice(0, 3);
    return `주요 재료: ${mainIngredients.join(', ')}${ingredientList.length > 3 ? '...' : ''}`;
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 relative',
        'hover:shadow-xl hover:-translate-y-2',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${recipe.title} 레시피 보기`}
    >
      {/* 더보기 아이콘 */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          onClick={handleMoreClick}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
          aria-label="더보기 메뉴"
        >
          <svg 
            className="w-5 h-5" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        
        {/* 드롭다운 메뉴 */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-white shadow-lg border border-gray-100 rounded-lg py-1 z-10 min-w-[120px]">
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              수정
            </button>
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm font-semibold text-red-400 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-suit font-bold text-gray-800 mb-3 pr-8">
          {recipe.title}
        </h3>
        
        {/* 주요 재료 */}
        <p className="text-sm font-inter text-gray-600 mb-4 line-clamp-2">
          {getMainIngredients(recipe.ingredients)}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <span className={cn(
            'text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap',
            getDifficultyColor(recipe.difficulty)
          )}>
            난이도: {recipe.difficulty}
          </span>
          <span className={cn(
            'text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap',
            TAG_COLORS.TIME
          )}>
            시간: {recipe.cookingTime}
          </span>
          <span className={cn(
            'text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap',
            TAG_COLORS.SERVINGS
          )}>
            {recipe.servings}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
