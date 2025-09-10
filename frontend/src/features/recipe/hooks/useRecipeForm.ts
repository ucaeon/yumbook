import { useState, useEffect } from 'react';
import type { RecipeFormData, FormMode } from '../types/recipeForm';
import type { Ingredient, Instruction } from '../types/recipe';
import type { DifficultyLevel } from '../constants/recipe';
import { validateRecipeForm, type ValidationError } from '../utils/formValidation';

const DEFAULT_INGREDIENT = { id: '1', name: '', amount: '' };
const DEFAULT_INSTRUCTION = { id: '1', step: '' };

interface UseRecipeFormProps {
  mode: FormMode;
  initialData?: Partial<RecipeFormData>;
  onSubmit: (data: RecipeFormData) => void;
}

export const useRecipeForm = ({ mode, initialData, onSubmit }: UseRecipeFormProps) => {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: '',
    ingredients: [DEFAULT_INGREDIENT],
    instructions: [DEFAULT_INSTRUCTION],
    difficulty: '쉬움' as DifficultyLevel,
    cookingTime: '',
    servings: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        title: initialData.title || '',
        ingredients: initialData.ingredients && initialData.ingredients.length > 0 
          ? initialData.ingredients 
          : [DEFAULT_INGREDIENT],
        instructions: initialData.instructions && initialData.instructions.length > 0 
          ? initialData.instructions 
          : [DEFAULT_INSTRUCTION],
        difficulty: initialData.difficulty || '쉬움',
        cookingTime: initialData.cookingTime || '',
        servings: initialData.servings || '',
      });
    }
  }, [mode, initialData]);

  const handleInputChange = (field: keyof RecipeFormData, value: string | Ingredient[] | Instruction[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // 해당 필드의 에러 제거
    if (!errors.length) return;
    setErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const validationErrors = validateRecipeForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      ingredients: [{ id: '1', name: '', amount: '' }],
      instructions: [{ id: '1', step: '' }],
      difficulty: '쉬움',
      cookingTime: '',
      servings: '',
    });
    setErrors([]);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    resetForm,
    setErrors,
  };
};
