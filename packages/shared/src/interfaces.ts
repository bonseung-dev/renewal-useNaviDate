// Base interfaces
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

// Core entity interfaces
export interface User extends BaseEntity {
  email: string;
  password?: string;
  nickname?: string;
  profileImage?: Image | string; // string for backend compatibility
  googleId?: string;
  isVerified?: boolean;
  tempToken?: string;
}

export interface Couple extends BaseEntity {
  userAId: number;
  userBId: number | null;
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
}

export interface Post extends BaseEntity {
  userId: number;
  title: string;
  content: string;
  visibility: 'private' | 'public' | boolean; // boolean for frontend compatibility
  date: Date | string; // Date for backend, string for frontend
  emotion: Emotion;
  deletedAt: Date | null;
}

export interface Anniversary extends BaseEntity {
  coupleId: number;
  title: string;
  date: Date | string; // Date for backend, string for frontend
  repeat: RepeatOption;
  memo?: string;
  createdBy: number | Date; // Date for frontend compatibility
}

export interface Image extends BaseEntity {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  userId?: number;
}

export interface Bookmark extends BaseEntity {
  postId: number;
  userId: number;
}

export interface Like extends BaseEntity {
  postId: number;
  userId: number;
}

export interface Chat extends BaseEntity {
  userAId: number;
  userBId: number;
  message: string;
}

export interface ChatMessage extends BaseEntity {
  chatId: number;
  userId: number;
  content: string;
}

export interface Setting extends BaseEntity {
  userId: number;
  theme: 'light' | 'dark';
  allowPush: boolean;
}

export interface Notification extends BaseEntity {
  userId: number;
  type: 'like' | 'event' | 'anniversary';
  message: string;
  isRead: boolean;
}

// Response interfaces
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

// Extended interfaces
export interface PostTag extends BaseEntity {
  postId: number;
  name: string;
}

export interface PostImage extends BaseEntity {
  postId: number;
  postImage?: Image; // Frontend compatibility
  imageUrl?: string; // Backend compatibility
  address: string | null;
  isRepresentative: boolean;
}

export interface CalendarPost extends Post {
  images: PostImage[];
}

export interface HolidayEvent {
  start: {
    date: string; // YYYY-MM-DD
  };
  summary: string; // 공휴일 이름
}

export interface Holiday {
  date: string;
  summary: string;
  isLegalHoliday: boolean;
}

export interface BackendHoliday {
  date: string;
  items: BackendHolidayItem[];
}

export interface BackendHolidayItem {
  name: string;
  type: '법정공휴일' | '기념일' | '대체공휴일';
  meta?: Record<string, unknown>;
}

export interface CommunityPost extends Post {
  author?: User;
  partner?: User;
  tags?: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes?: Like[];
  bookmarks?: Bookmark[];
}

export interface PartnerInfo {
  id: number;
  profileImage: string | Image;
  nickname: string;
}

export interface CoupleResponse {
  userA: User;
  userB: User;
}

export interface UserResponse {
  profileImage?: Image;
  nickname?: string;
}

export interface Tag extends BaseEntity {
  name: string;
  userId?: number;
}

// Import types from enums
import { Emotion, RepeatOption } from './enums';

// Re-export for convenience
export type { Emotion, RepeatOption };
