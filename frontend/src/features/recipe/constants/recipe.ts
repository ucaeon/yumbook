export const DIFFICULTY_COLORS = {
  쉬움: 'bg-[#A8C4A4] text-white',
  보통: 'bg-[#FFB888] text-white',
  어려움: 'bg-[#E4D0B8] text-white',
} as const;

export const TAG_COLORS = {
  TIME: 'bg-[#FFB888] text-white',
  SERVINGS: 'bg-[#E4D0B8] text-white',
} as const;

export const DIFFICULTY_LEVELS = ['쉬움', '보통', '어려움'] as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];
