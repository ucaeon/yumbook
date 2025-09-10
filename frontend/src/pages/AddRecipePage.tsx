import { useNavigate } from 'react-router-dom';
import RecipeForm from '../features/recipe/components/RecipeForm';
import { recipeService } from '../features/recipe/services/recipeService';
import { useToastNotification } from '../shared/hooks/useToastNotification';
import type { RecipeFormData } from '../features/recipe/types/recipeForm';

const AddRecipePage = () => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToastNotification();

  const handleSubmit = async (data: RecipeFormData) => {
    try {
      await recipeService.createRecipe(data);
      showSuccess('레시피 생성 완료', '새로운 레시피가 성공적으로 추가되었습니다.');
      navigate('/');
    } catch (error) {
      showError('레시피 생성 실패', '레시피 생성 중 오류가 발생했습니다.');
      console.error('레시피 생성 실패:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <RecipeForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default AddRecipePage;
