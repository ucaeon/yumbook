import BaseHeader from '../../../shared/components/BaseHeader';
import Button from '../../common/components/Button';
import { COMMON_STYLES } from '../constants/recipe';
import type { FormMode } from '../types/recipeForm';

interface RecipeFormHeaderProps {
  mode: FormMode;
  onSave: () => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const RecipeFormHeader = ({ mode, onSave, onCancel, isSubmitting = false }: RecipeFormHeaderProps) => {
  return (
    <BaseHeader>
      <div className="flex items-center space-x-3">
        <Button 
          onClick={onSave}
          variant="success"
          size="md"
          className={COMMON_STYLES.BUTTON_PRIMARY}
          disabled={isSubmitting}
        >
          {isSubmitting ? '저장 중...' : '저장'}
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          size="md"
          className={COMMON_STYLES.BUTTON_PRIMARY}
          disabled={isSubmitting}
        >
          취소
        </Button>
      </div>
    </BaseHeader>
  );
};

export default RecipeFormHeader;
