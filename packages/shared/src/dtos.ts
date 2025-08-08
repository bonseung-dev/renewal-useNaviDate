// Auth DTOs
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

// Post DTOs
export interface CreatePostDto {
  title: string;
  content: string;
  date: Date;
  location?: string;
  emotion: Emotion;
  images?: string[];
  tags?: string[];
  isPublic: boolean;
  coupleId?: number;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  date?: Date;
  location?: string;
  emotion?: Emotion;
  images?: string[];
  tags?: string[];
  isPublic?: boolean;
}

// Couple DTOs
export interface CreateCoupleDto {
  user2Id: number;
}

export interface UpdateCoupleDto {
  userBId?: number;
  anniversary?: string;
  name?: string;
  status?: 'pending' | 'confirm' | 'delete';
}

// Anniversary DTOs
export interface CreateAnniversaryDto {
  coupleId: number;
  title: string;
  date: Date;
  repeat?: RepeatOption;
  memo?: string;
  createdBy?: number;
}

export interface UpdateAnniversaryDto {
  title?: string;
  date?: Date;
  description?: string;
  repeat?: RepeatOption;
}

// Notification DTOs
export interface CreateNotificationDto {
  userId: number;
  type: string;
  title: string;
  message: string;
}

export interface UpdateNotificationDto {
  type?: string;
  title?: string;
  message?: string;
  isRead?: boolean;
}

// Setting DTOs
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

// User DTOs
export interface UpdateUserDto {
  email?: string;
  password?: string;
  nickname?: string;
  profileImage?: string;
}

// Import types from enums
import { Emotion, RepeatOption } from './enums'; 