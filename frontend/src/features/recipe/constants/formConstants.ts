// 난이도 관련 상수는 recipe.ts에서 import
export { DIFFICULTY_LEVELS, DIFFICULTY_COLORS } from './recipe';

export const FORM_PLACEHOLDERS = {
  title: '맛있는 레시피 제목을 입력하세요',
  ingredients: '재료명',
  amount: '수량',
  instructions: '요리 순서를 입력하세요',
  cookingTime: '30',
  servings: '2',
} as const;

export const FORM_LABELS = {
  title: '레시피 제목',
  difficulty: '난이도',
  cookingTime: '요리 시간',
  servings: '분량',
  ingredients: '재료',
  instructions: '요리 순서',
} as const;

export const FORM_MESSAGES = {
  create: {
    title: '새로운 레시피 등록하기',
    subtitle: '나만의 소중한 레시피를 추가해 보세요.',
    submitButton: '레시피 추가',
  },
  edit: {
    title: '레시피 수정하기',
    subtitle: '레시피를 수정해 보세요.',
    submitButton: '레시피 수정',
  },
} as const;
