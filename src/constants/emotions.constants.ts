import { Emotion } from '@/types/calendar.type';

export const EMOTION_IMAGES: Record<Emotion, string> = {
  Joy: '/emotions/emotion_happy.png',
  Fun: '/emotions/emotion_excited.png',
  Soso: '/emotions/emotion_usual.png',
  Sad: '/emotions/emotion_sad.png',
  Mad: '/emotions/emotion_angry.png',
} as const;
