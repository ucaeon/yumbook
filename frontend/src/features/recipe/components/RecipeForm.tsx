import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useRecipeForm } from '../hooks/useRecipeForm';
import { getFieldError, validateRecipeForm } from '../utils/formValidation';
import { FORM_PLACEHOLDERS, FORM_LABELS, FORM_MESSAGES } from '../constants/formConstants';
import { COMMON_STYLES } from '../constants/recipe';
import { cn } from '../../../shared/utils/cn';
import Button from '../../common/components/Button';
import type { RecipeFormProps } from '../types/recipeForm';
import type { DifficultyLevel } from '../constants/recipe';
import FormField from './FormField';
import DifficultySelector from './DifficultySelector';
import IngredientField from './IngredientField';
import InstructionField from './InstructionField';

const RecipeForm = ({ mode, initialData, onSubmit, onCancel, loading = false }: RecipeFormProps) => {
  const navigate = useNavigate();

  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
    setErrors,
  } = useRecipeForm({
    mode,
    initialData,
    onSubmit,
  });

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
      return;
    }
    navigate('/');
  }, [onCancel, navigate]);

  const handleSave = useCallback(() => {
    // 폼 제출을 직접 처리
    const validationErrors = validateRecipeForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onSubmit(formData);
  }, [formData, onSubmit, setErrors]);

  const messages = FORM_MESSAGES[mode];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title Section with Background Image */}
      <section 
        className="relative py-24 px-4"
        style={{
          backgroundImage: 'url(/images/yumbook_main_image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#fef7ee'
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-poppins">
            {messages.title}
          </h1>
          <p className="text-xl text-gray-600 font-inter font-medium">
            {messages.subtitle}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className={COMMON_STYLES.SECTION_PADDING}>
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50">
            <div className="space-y-8">
              
              {/* Recipe Title */}
              <FormField
                label={FORM_LABELS.title}
                error={getFieldError(errors, 'title')}
                required
              >
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={FORM_PLACEHOLDERS.title}
                  className={COMMON_STYLES.INPUT_FIELD}
                  disabled={isSubmitting || loading}
                />
              </FormField>

              {/* Difficulty */}
              <FormField
                label={FORM_LABELS.difficulty}
                error={getFieldError(errors, 'difficulty')}
                required
              >
                 <DifficultySelector
                   selectedDifficulty={formData.difficulty}
                   onSelect={(value) => handleInputChange('difficulty', value)}
                 />
              </FormField>

              {/* Cooking Time */}
              <FormField
                label={FORM_LABELS.cookingTime}
                error={getFieldError(errors, 'cookingTime')}
                required
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={formData.cookingTime}
                    onChange={(e) => handleInputChange('cookingTime', e.target.value)}
                    placeholder={FORM_PLACEHOLDERS.cookingTime}
                    className={COMMON_STYLES.INPUT_FIELD_SMALL}
                    disabled={isSubmitting || loading}
                  />
                  <span className="text-gray-600 font-inter">분</span>
                </div>
              </FormField>

              {/* Servings */}
              <FormField
                label={FORM_LABELS.servings}
                error={getFieldError(errors, 'servings')}
                required
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={formData.servings}
                    onChange={(e) => handleInputChange('servings', e.target.value)}
                    placeholder={FORM_PLACEHOLDERS.servings}
                    className={COMMON_STYLES.INPUT_FIELD_SMALL}
                    disabled={isSubmitting || loading}
                  />
                  <span className="text-gray-600 font-inter">인분</span>
                </div>
              </FormField>

              {/* Ingredients */}
              <FormField
                label={FORM_LABELS.ingredients}
                error={getFieldError(errors, 'ingredients')}
                required
              >
                 <IngredientField
                   ingredients={formData.ingredients}
                   onIngredientsChange={(ingredients) => handleInputChange('ingredients', ingredients)}
                 />
              </FormField>

              {/* Instructions */}
              <FormField
                label={FORM_LABELS.instructions}
                error={getFieldError(errors, 'instructions')}
                required
              >
                 <InstructionField
                   instructions={formData.instructions}
                   onInstructionsChange={(instructions) => handleInputChange('instructions', instructions)}
                 />
              </FormField>

            </div>
          </form>

          {/* Action Buttons */}
          <div className="mt-8 text-center">
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={handleSave}
                variant="edit"
                disabled={isSubmitting || loading}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                }
              >
                {isSubmitting || loading ? '저장 중...' : '저장'}
              </Button>
              <Button
                onClick={handleCancel}
                variant="delete"
                disabled={isSubmitting || loading}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                }
              >
                취소
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeForm;
