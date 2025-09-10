import { DIFFICULTY_LEVELS, DIFFICULTY_COLORS } from '../constants/recipe';
import { cn } from '../../../shared/utils/cn';
import type { DifficultyLevel } from '../constants/recipe';

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyLevel;
  onSelect: (difficulty: DifficultyLevel) => void;
}

const DifficultySelector = ({ selectedDifficulty, onSelect }: DifficultySelectorProps) => {

  return (
    <div className="flex space-x-4">
      {DIFFICULTY_LEVELS.map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onSelect(level)}
          className={cn(
            'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap',
            selectedDifficulty === level
              ? `${DIFFICULTY_COLORS[level]} shadow-lg`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
          aria-pressed={selectedDifficulty === level}
          aria-label={`난이도 ${level} 선택`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
