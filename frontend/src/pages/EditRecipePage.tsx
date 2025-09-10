import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import RecipeForm from '../features/recipe/components/RecipeForm';
import { recipeService } from '../features/recipe/services/recipeService';
import { useToastNotification } from '../shared/hooks/useToastNotification';
import Layout from '../shared/components/Layout';
import type { RecipeFormData } from '../features/recipe/types/recipeForm';
import type { Recipe } from '../features/recipe/types/recipe';

const EditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useToastNotification();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('레시피 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        const recipeData = await recipeService.getRecipeById(parseInt(id));
        setRecipe(recipeData);
      } catch (err) {
        setError('레시피를 불러오는데 실패했습니다.');
        console.error('레시피 조회 실패:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (data: RecipeFormData) => {
    if (!id) return;

    try {
      await recipeService.updateRecipe(parseInt(id), data);
      showSuccess('레시피 수정 완료', '레시피가 성공적으로 수정되었습니다.');
      
      // 이전 페이지가 상세페이지인지 확인
      const fromDetailPage = location.state?.from === 'detail' || 
                            document.referrer.includes(`/recipe/${id}`);
      
      if (fromDetailPage) {
        navigate(`/recipe/${id}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      showError('레시피 수정 실패', '레시피 수정 중 오류가 발생했습니다.');
      console.error('레시피 수정 실패:', error);
    }
  };

  const handleCancel = () => {
    // 이전 페이지가 상세페이지인지 확인
    const fromDetailPage = location.state?.from === 'detail' || 
                          document.referrer.includes(`/recipe/${id}`);
    
    if (fromDetailPage) {
      navigate(`/recipe/${id}`);
    } else {
      navigate('/');
    }
  };

  if (!recipe && !loading && !error) {
    return null;
  }

  return (
    <Layout loading={loading} error={error}>
      {recipe && (
        <RecipeForm
          mode="edit"
          initialData={{
            title: recipe.title,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            difficulty: recipe.difficulty,
            cookingTime: recipe.cookingTime,
            servings: recipe.servings,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </Layout>
  );
};

export default EditRecipePage;
