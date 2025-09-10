import type { Ingredient, Instruction } from './recipe';
import type { DifficultyLevel } from '../constants/recipe';

export interface RecipeFormData {
  title: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  difficulty: DifficultyLevel;
  cookingTime: string;
  servings: string;
}

export interface RecipeFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<RecipeFormData>;
  onSubmit: (data: RecipeFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export type FormMode = 'create' | 'edit';
