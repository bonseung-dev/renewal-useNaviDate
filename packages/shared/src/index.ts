// Shared types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type User = {
  id: string;
  email: string;
  password?: string;
  nickname?: string;
  profileImage?: string;
  googleId?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt: string;
  tempToken?: string;
};

export interface Couple {
  id: string;
  userAId: string;
  userBId: string | null;
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface Anniversary {
  id: string;
  coupleId: string;
  title: string;
  date: string;
  repeat: RepeatOption;
  memo?: string;
  createdBy: string;
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
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  userAId: string;
  userBId: string;
  message: string;
  createdAt: Date;
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
  theme: 'light' | 'dark';
  allowPush: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'event' | 'anniversary';
  message: string;
  isRead: boolean;
  createdAt: Date;
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
export type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

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

// ====== 병합: Post/Tag/Image/CalendarPost ======
export type PostTag = {
  id: string;
  postId: string;
  name: string;
};

export type PostImage = {
  id: string;
  postId: string;
  imageUrl: string;
  address: string | null;
  isRepresentative: boolean;
};

export type CalendarPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
  createdAt: string;
  deletedAt: string | null;
  images: PostImage[];
};

// ====== 병합: Calendar/Holiday ======
export type HolidayEvent = {
  start: {
    date: string; // YYYY-MM-DD
  };
  summary: string; // 공휴일 이름
};

export type Holiday = {
  date: string;
  summary: string;
  isLegalHoliday: boolean;
};

export type BackendHoliday = {
  date: string;
  items: BackendHolidayItem[];
};

export type BackendHolidayItem = {
  name: string;
  type: '법정공휴일' | '기념일' | '대체공휴일';
  meta?: Record<string, unknown>;
};

// ====== 병합: CommunityPost ======
export type SortOption = 'latest' | 'likes' | 'bookmarks';
export type CommunityPost = Omit<Post, 'createdAt' | 'deletedAt'> & {
  createdAt: Date;
  deletedAt: Date | null;
  author?: User;
  partner?: User;
  tags: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes: Like[];
  bookmarks: Bookmark[];
};

// ====== 기타 ======
export type PartnerInfo = {
  id: string;
  profileImage: string;
  nickname: string;
};

export type CoupleResponse = {
  userAId: string;
  userBId: string;
};

export type UserResponse = {
  profileImage?: string;
  nickname?: string;
};

// Export constants
export * from './constants'; 