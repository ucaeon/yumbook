import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../features/recipe/hooks/useRecipes';
import Layout from '../shared/components/Layout';
import RecipeGrid from '../features/recipe/components/RecipeGrid';
import { COMMON_STYLES } from '../features/recipe/constants/recipe';
import type { Recipe } from '../features/recipe/types/recipe';

const HomePage = () => {
  const navigate = useNavigate();
  const { recipes, loading, error, refreshRecipes } = useRecipes();

  const handleRecipeClick = (recipe: Recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <Layout loading={loading} error={error}>
      {/* Hero Section */}
      <section 
        className={`relative ${COMMON_STYLES.HERO_PADDING} bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: 'url(/images/yumbook_main_image.png)',
          backgroundColor: '#fef7ee'
        }}
      >
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-poppins font-black text-gray-800 mb-6">
            My Recipe Book
          </h1>
          <p className="text-xl font-inter font-medium text-gray-600 mb-8 max-w-2xl mx-auto">
            소중한 레시피를 간편하게 저장하고 관리하세요
          </p>
        </div>
      </section>

      {/* Recipe Grid Section */}
      <section className={COMMON_STYLES.SECTION_PADDING}>
        <div className="max-w-6xl mx-auto">
          <RecipeGrid 
            recipes={recipes} 
            onRecipeClick={handleRecipeClick}
            onRecipeDeleted={refreshRecipes}
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
