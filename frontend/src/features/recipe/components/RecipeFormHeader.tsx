import BaseHeader from '../../../shared/components/BaseHeader';

interface RecipeFormHeaderProps {
  mode: 'create' | 'edit';
}

const RecipeFormHeader = ({ mode }: RecipeFormHeaderProps) => {
  return <BaseHeader />;
};

export default RecipeFormHeader;
