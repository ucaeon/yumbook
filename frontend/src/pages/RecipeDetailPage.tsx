import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../shared/components/Layout';
import Button from '../features/common/components/Button';
import ConfirmModal from '../shared/components/ConfirmModal';
import { recipeService } from '../features/recipe/services/recipeService';
import { useToastNotification } from '../shared/hooks/useToastNotification';
import { COMMON_STYLES, DIFFICULTY_COLORS, TAG_COLORS } from '../features/recipe/constants/recipe';
import { cn } from '../shared/utils/cn';
import type { Recipe } from '../features/recipe/types/recipe';

const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { showSuccess, showError } = useToastNotification();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) {
        setError('레시피 ID가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
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

  const handleEdit = () => {
    navigate(`/edit-recipe/${id}`, { state: { from: 'detail' } });
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!recipe) return;

    try {
      setIsDeleting(true);
      await recipeService.deleteRecipe(recipe.id);
      showSuccess('레시피 삭제 완료', '레시피가 성공적으로 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      showError('레시피 삭제 실패', '레시피 삭제 중 오류가 발생했습니다.');
      console.error('레시피 삭제 실패:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Layout loading={true}>
        <div></div>
      </Layout>
    );
  }

  if (error || !recipe) {
    return (
      <Layout error={error}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              레시피를 찾을 수 없습니다
            </h3>
            <p className="text-gray-500 mb-6">
              요청하신 레시피가 존재하지 않거나 삭제되었습니다.
            </p>
            <Button 
              variant="home" 
              onClick={handleGoHome}
              icon={
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              }
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-24 px-4"
        style={{
          backgroundImage: 'url(/images/yumbook_main_image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#fef7ee'
        }}
      >
        <div className="absolute inset-0 bg-white/85"></div>
        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-4 font-poppins">
                {recipe.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className={cn(
                  'text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap',
                  DIFFICULTY_COLORS[recipe.difficulty]
                )}>
                  {recipe.difficulty}
                </span>
                <span className={cn(
                  'text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap',
                  TAG_COLORS.TIME
                )}>
                  {recipe.cookingTime}분
                </span>
                <span className={cn(
                  'text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap',
                  TAG_COLORS.SERVINGS
                )}>
                  {recipe.servings}인분
                </span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="edit" 
                onClick={handleEdit}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                수정
              </Button>
              <Button 
                variant="delete" 
                onClick={handleDelete}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                삭제
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className={COMMON_STYLES.SECTION_PADDING}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Ingredients Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#A3B899] rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-suit">재료</h2>
              </div>
              
              <div className="space-y-2">
                {recipe.ingredients && recipe.ingredients.length > 0 ? (
                  recipe.ingredients.map((ingredient, index) => (
                    <div key={ingredient.id || index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-800 font-medium font-inter">{ingredient.name}</span>
                      <span className="text-gray-600 font-inter">{ingredient.amount}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-inter">재료 정보가 없습니다.</p>
                )}
              </div>
            </div>

            {/* Recipe Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-[#FFB888] rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-suit">레시피 정보</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-inter">조리 시간</p>
                    <p className="text-lg font-semibold text-gray-800 font-inter">{recipe.cookingTime}분</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-full">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-inter">인분</p>
                    <p className="text-lg font-semibold text-gray-800 font-inter">{recipe.servings}명</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-inter">난이도</p>
                    <p className="text-lg font-semibold text-gray-800 font-inter">{recipe.difficulty}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-50">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 flex items-center justify-center bg-[#E4D0B8] rounded-full mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-suit">요리 순서</h2>
              </div>
              
              <div className="space-y-6">
                {recipe.instructions && recipe.instructions.length > 0 ? (
                  recipe.instructions.map((instruction, index) => (
                    <div key={instruction.id || index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#A3B899] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed font-inter text-lg">{instruction.step}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-inter">요리 순서가 없습니다.</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center">
            <div className="flex justify-center space-x-4">
              <Button 
                variant="home" 
                onClick={handleGoHome}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
              >
                홈으로 돌아가기
              </Button>
              <Button 
                variant="home" 
                onClick={handleEdit}
                icon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                }
              >
                레시피 수정하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="레시피 삭제"
        message={`"${recipe.title}" 레시피를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmText="삭제"
        cancelText="취소"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={isDeleting}
      />
    </Layout>
  );
};

export default RecipeDetailPage;
