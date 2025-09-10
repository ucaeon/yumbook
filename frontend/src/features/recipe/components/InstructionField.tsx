import { cn } from '../../../shared/utils/cn';
import { COMMON_STYLES } from '../constants/recipe';
import type { Instruction } from '../types/recipe';

const DEFAULT_INSTRUCTION = { id: '1', step: '' };

interface InstructionFieldProps {
  instructions: Instruction[];
  onInstructionsChange: (instructions: Instruction[]) => void;
}

const InstructionField = ({ instructions, onInstructionsChange }: InstructionFieldProps) => {
  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...instructions];
    newInstructions[index] = { ...newInstructions[index], step: value };
    onInstructionsChange(newInstructions);
  };

  const addInstruction = () => {
    const newInstruction: Instruction = {
      ...DEFAULT_INSTRUCTION,
      id: Math.random().toString(36).substring(2, 9),
    };
    onInstructionsChange([...instructions, newInstruction]);
  };

  const removeInstruction = (index: number) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    if (newInstructions.length === 0) {
      // 최소 하나의 단계는 유지
      newInstructions.push({
        ...DEFAULT_INSTRUCTION,
        id: Math.random().toString(36).substring(2, 9),
      });
    }
    onInstructionsChange(newInstructions);
  };

  return (
    <div className="space-y-3">
      {instructions.map((instruction, index) => (
        <div key={instruction.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-[#A3B899] text-white rounded-full flex items-center justify-center font-bold text-sm mt-2">
            {index + 1}
          </div>
          <textarea
            value={instruction.step}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
            placeholder="요리 순서를 입력하세요"
            rows={3}
            className={cn("flex-1 resize-none", COMMON_STYLES.INPUT_FIELD)}
          />
          <button
            type="button"
            onClick={() => removeInstruction(index)}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors duration-200 mt-2"
            disabled={instructions.length === 1}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={addInstruction}
        className={COMMON_STYLES.ADD_BUTTON}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">순서 추가</span>
      </button>
    </div>
  );
};

export default InstructionField;
