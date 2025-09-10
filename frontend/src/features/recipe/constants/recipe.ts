// 색상 상수
export const COLORS = {
  DIFFICULTY: '#A8C4A4',
  TIME: '#FFB888', 
  SERVINGS: '#E4D0B8',
} as const;

// 난이도 관련 상수
export const DIFFICULTY_LEVELS = ['쉬움', '보통', '어려움'] as const;
export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

// 스타일 클래스
export const DIFFICULTY_COLORS = {
  쉬움: 'bg-[#A8C4A4] text-white',
  보통: 'bg-[#A8C4A4] text-white', 
  어려움: 'bg-[#A8C4A4] text-white',
} as const;

export const TAG_COLORS = {
  TIME: 'bg-[#FFB888] text-white',
  SERVINGS: 'bg-[#E4D0B8] text-white',
} as const;

// UI 상수
export const UI_CONSTANTS = {
  MAX_INGREDIENTS_DISPLAY: 3,
  CARD_HOVER_TRANSFORM: '-translate-y-2',
  TRANSITION_DURATION: 'duration-300',
} as const;

// 공통 스타일 클래스
export const COMMON_STYLES = {
  BUTTON_PRIMARY: 'whitespace-nowrap font-poppins font-semibold text-sm',
  INPUT_FIELD: 'px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A3B899] transition-colors duration-200 text-gray-800 font-inter',
  INPUT_FIELD_SMALL: 'w-32 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#A3B899] transition-colors duration-200 text-gray-800 font-inter',
  MENU_ITEM: 'w-full px-4 py-2 text-left text-sm font-semibold transition-colors duration-200 flex items-center gap-2',
  SECTION_PADDING: 'py-16 px-4',
  HERO_PADDING: 'py-20 px-4',
  ADD_BUTTON: 'flex items-center space-x-2 px-4 py-3 text-[#A3B899] hover:text-[#8FA584] transition-colors duration-200 cursor-pointer',
} as const;
