import { cn } from '../../../shared/utils/cn';
import { COMMON_STYLES } from '../constants/recipe';
import type { Ingredient } from '../types/recipe';

const DEFAULT_INGREDIENT = { id: '1', name: '', amount: '' };

interface IngredientFieldProps {
  ingredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
}

const IngredientField = ({ ingredients, onIngredientsChange }: IngredientFieldProps) => {
  const handleIngredientChange = (index: number, field: 'name' | 'amount', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    onIngredientsChange(newIngredients);
  };

  const addIngredient = () => {
    const newIngredient: Ingredient = {
      ...DEFAULT_INGREDIENT,
      id: Math.random().toString(36).substring(2, 9),
    };
    onIngredientsChange([...ingredients, newIngredient]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    if (newIngredients.length === 0) {
      // 최소 하나의 재료는 유지
      newIngredients.push({
        ...DEFAULT_INGREDIENT,
        id: Math.random().toString(36).substring(2, 9),
      });
    }
    onIngredientsChange(newIngredients);
  };

  return (
    <div className="space-y-3">
      {ingredients.map((ingredient, index) => (
        <div key={ingredient.id} className="flex items-center space-x-3">
          <input
            type="text"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            placeholder="재료명"
            className={cn("flex-1", COMMON_STYLES.INPUT_FIELD)}
          />
          <input
            type="text"
            value={ingredient.amount}
            onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
            placeholder="수량"
            className={cn("w-32", COMMON_STYLES.INPUT_FIELD)}
          />
          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors duration-200"
            disabled={ingredients.length === 1}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addIngredient}
        className={COMMON_STYLES.ADD_BUTTON}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">재료 추가</span>
      </button>
    </div>
  );
};

export default IngredientField;
