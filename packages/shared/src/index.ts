// Shared types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Couple {
  id: string;
  user_a_id: string;
  user_b_id: string | null;
  user1?: User;
  user2?: User;
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  created_at: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  user_id: string;
  coupleId?: string;
  title: string;
  content: string;
  date: Date;
  location?: string;
  emotion: 'happy' | 'sad' | 'excited' | 'angry' | 'usual';
  images?: string[];
  tags?: string[];
  visibility: 'private' | 'public';
  created_at: Date;
  deleted_at: Date | null;
  updatedAt: Date;
}

export interface Anniversary {
  id: string;
  couple_id: string;
  title: string;
  date: Date;
  repeat: 'NONE' | 'YEARLY';
  memo?: string;
  created_by: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  id: string;
  user1Id: string;
  user2Id: string;
  user1?: User;
  user2?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Setting {
  id: string;
  userId: string;
  notificationPreference?: string;
  themePreference?: string;
  emailNotification?: boolean;
  pushNotification?: boolean;
  privacySettings?: {
    showProfile: boolean;
    showStatus: boolean;
    showLastSeen: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Auth types
export interface CreateUserDto {
  email: string;
  password?: string;
  nickname: string;
  profileImage?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  access_token?: string;
  message?: string;
}

export interface ImageUploadResponse {
  success: boolean;
  data?: Image;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// DTOs
export interface CreatePostDto {
  title: string;
  content: string;
  date: Date;
  location?: string;
  emotion: Emotion;
  images?: string[];
  tags?: string[];
  isPublic: boolean;
  coupleId?: string;
}

export interface CreateCoupleDto {
  user2Id: string;
}

export interface CreateAnniversaryDto {
  coupleId: string;
  title: string;
  date: Date;
  description?: string;
}

export interface CreateNotificationDto {
  userId: string;
  type: string;
  title: string;
  message: string;
}

export interface UpdateSettingDto {
  notificationPreference?: string;
  themePreference?: string;
  emailNotification?: boolean;
  pushNotification?: boolean;
  privacySettings?: {
    showProfile: boolean;
    showStatus: boolean;
    showLastSeen: boolean;
  };
}

// Enums and constants
export type RepeatOption = 'NONE' | 'YEARLY';
export type Emotion = 'happy' | 'sad' | 'excited' | 'angry' | 'usual';

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

// Shared utilities
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

export const formatDateForDisplay = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const calculateDaysBetween = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay));
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Shared constants
export const DEFAULT_PAGE_SIZE = 10; 