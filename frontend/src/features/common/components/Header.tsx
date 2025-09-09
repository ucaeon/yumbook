import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-3"
            tabIndex={0}
            aria-label="YumBook 홈으로 이동"
          >
            <div className="text-3xl">🍳</div>
            <img 
              src="/images/yumbook_logo.png" 
              alt="YumBook 로고" 
              className="h-12 w-auto"
            />
          </Link>
          
          <Button 
            onClick={handleAddRecipe}
            variant="success"
            size="md"
            className="whitespace-nowrap font-poppins font-semibold text-sm"
          >
            + Add New Recipe
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
