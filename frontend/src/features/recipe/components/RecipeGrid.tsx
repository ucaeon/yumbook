import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RecipeGridProps, Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';
import ConfirmModal from '../../../shared/components/ConfirmModal';
import { useToastNotification } from '../../../shared/hooks/useToastNotification';
import { recipeService } from '../services/recipeService';

const RecipeGrid = ({ recipes, onRecipeClick, onRecipeDeleted }: RecipeGridProps) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<Recipe | null>(null);
  const { showSuccess, showError } = useToastNotification();

  const handleRecipeClick = (recipe: Recipe) => {
    onRecipeClick?.(recipe);
  };

  const handleDelete = (recipeId: number) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      setRecipeToDelete(recipe);
      setShowDeleteModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      setIsDeleting(true);
      await recipeService.deleteRecipe(recipeToDelete.id);
      showSuccess('레시피 삭제 완료', '레시피가 성공적으로 삭제되었습니다.');
      setShowDeleteModal(false);
      setRecipeToDelete(null);
      // 레시피 목록 새로고침
      onRecipeDeleted?.();
    } catch (error) {
      showError('레시피 삭제 실패', '레시피 삭제 중 오류가 발생했습니다.');
      console.error('레시피 삭제 실패:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
    setIsDeleting(false);
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onClick={() => handleRecipeClick(recipe)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="레시피 삭제"
        message={`"${recipeToDelete?.title}" 레시피를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        cancelText="취소"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default RecipeGrid;
