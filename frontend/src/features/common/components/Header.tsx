import { useNavigate } from 'react-router-dom';
import BaseHeader from '../../../shared/components/BaseHeader';
import Button from './Button';
import { COMMON_STYLES } from '../../recipe/constants/recipe';

const Header = () => {
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    navigate('/add-recipe');
  };

  return (
    <BaseHeader>
      <Button 
        onClick={handleAddRecipe}
        variant="success"
        size="md"
        className={COMMON_STYLES.BUTTON_PRIMARY}
      >
        + Add New Recipe
      </Button>
    </BaseHeader>
  );
};

export default Header;
