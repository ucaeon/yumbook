import type { RecipeFormData } from '../types/recipeForm';

export interface ValidationError {
  field: keyof RecipeFormData;
  message: string;
}

export const validateRecipeForm = (data: RecipeFormData): ValidationError[] => {
  const errors: ValidationError[] = [];

  // 제목 검증
  if (!data.title.trim()) {
    errors.push({ field: 'title', message: '레시피 제목을 입력해주세요.' });
  } else if (data.title.trim().length > 100) {
    errors.push({ field: 'title', message: '제목은 100글자 이하로 입력해주세요.' });
  }

  // 재료 검증
  if (!data.ingredients || data.ingredients.length === 0) {
    errors.push({ field: 'ingredients', message: '재료를 입력해주세요.' });
  } else {
    const hasValidIngredient = data.ingredients.some(ingredient => 
      ingredient.name.trim() && ingredient.amount.trim()
    );
    if (!hasValidIngredient) {
      errors.push({ field: 'ingredients', message: '재료명과 수량을 모두 입력해주세요.' });
    }
  }

  // 조리법 검증
  if (!data.instructions || data.instructions.length === 0) {
    errors.push({ field: 'instructions', message: '조리법을 입력해주세요.' });
  } else {
    const hasValidInstruction = data.instructions.some(instruction => 
      instruction.step.trim().length > 0
    );
    if (!hasValidInstruction) {
      errors.push({ field: 'instructions', message: '조리법을 입력해주세요.' });
    }
  }

  // 조리 시간 검증
  if (!data.cookingTime.trim()) {
    errors.push({ field: 'cookingTime', message: '조리 시간을 입력해주세요.' });
  } else {
    const time = parseInt(data.cookingTime);
    if (isNaN(time) || time <= 0) {
      errors.push({ field: 'cookingTime', message: '올바른 조리 시간을 입력해주세요.' });
    } else if (time > 999) {
      errors.push({ field: 'cookingTime', message: '조리 시간은 999분 이하로 입력해주세요.' });
    }
  }

  // 인분 검증
  if (!data.servings.trim()) {
    errors.push({ field: 'servings', message: '인분을 입력해주세요.' });
  } else {
    const servings = parseInt(data.servings);
    if (isNaN(servings) || servings <= 0) {
      errors.push({ field: 'servings', message: '올바른 인분을 입력해주세요.' });
    } else if (servings > 99) {
      errors.push({ field: 'servings', message: '인분은 99인분 이하로 입력해주세요.' });
    }
  }

  return errors;
};

export const getFieldError = (errors: ValidationError[], field: keyof RecipeFormData): string | undefined => {
  return errors.find(error => error.field === field)?.message;
};
