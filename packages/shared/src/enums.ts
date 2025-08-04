// Enum types
export type RepeatOption = 'NONE' | 'YEARLY';
export type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';
export type SortOption = 'latest' | 'likes' | 'bookmarks';

// Emotion constants
export const EMOTIONS = {
  HAPPY: 'happy',
  SAD: 'sad',
  EXCITED: 'excited',
  ANGRY: 'angry',
  USUAL: 'usual'
} as const;

export const EMOTION_LABELS = {
  [EMOTIONS.HAPPY]: '행복',
  [EMOTIONS.SAD]: '슬픔',
  [EMOTIONS.EXCITED]: '신남',
  [EMOTIONS.ANGRY]: '화남',
  [EMOTIONS.USUAL]: '보통'
} as const;

// Shared constants
export const DEFAULT_PAGE_SIZE = 10; 