// 공통 상수 정의

// 법정 공휴일 목록
export const LEGAL_HOLIDAYS = [
  '새해첫날',
  '설날',
  '추석',
  '삼일절',
  '광복절',
  '개천절',
  '한글날',
  '크리스마스',
  '부처님오신날',
  '어린이날',
  '대체공휴일',
  '대통령 선거',
] as const;

// 감정 타입은 enums.ts에서 관리

// 게시물 가시성
export const POST_VISIBILITY = {
  PRIVATE: 'private',
  PUBLIC: 'public',
} as const;

// 커플 상태
export const COUPLE_STATUS = {
  PENDING: 'pending',
  CONFIRM: 'confirm',
  DELETE: 'delete',
} as const;

// 반복 옵션
export const REPEAT_OPTIONS = {
  NONE: 'NONE',
  YEARLY: 'YEARLY',
} as const;

// 알림 타입
export const NOTIFICATION_TYPES = {
  LIKE: 'like',
  EVENT: 'event',
  ANNIVERSARY: 'anniversary',
} as const;

// 테마 옵션
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// 정렬 옵션
export const SORT_OPTIONS = {
  LATEST: 'latest',
  LIKES: 'likes',
  BOOKMARKS: 'bookmarks',
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GOOGLE: '/auth/google',
    PROFILE: '/auth/profile',
  },
  POSTS: {
    BASE: '/posts',
    MY: '/posts/my',
  },
  COUPLES: {
    BASE: '/couples',
  },
  ANNIVERSARIES: {
    BASE: '/anniversaries',
    COUPLE: '/anniversaries/couple',
  },
  USERS: {
    BASE: '/users',
  },
  IMAGES: {
    BASE: '/images',
  },
  LIKES: {
    BASE: '/likes',
  },
  BOOKMARKS: {
    BASE: '/bookmarks',
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
  },
  SETTINGS: {
    BASE: '/settings',
  },
  CHATS: {
    BASE: '/chats',
  },
} as const;

// 페이지 경로
export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  COMMUNITY: '/community',
  COUPLE_SPACE: '/couple-space',
  DATE_CALENDAR: '/date-calendar',
  DATE_DETAIL: '/date-detail',
  WRITE_DATE: '/write-date',
  MY_PAGE: '/my-page',
  SETTINGS: '/settings',
  NOTICE: '/notice',
} as const;

// 환경 변수 키
export const ENV_KEYS = {
  BACKEND_URL: 'NEXT_PUBLIC_BACKEND_URL',
  FRONTEND_URL: 'NEXT_PUBLIC_FRONTEND_URL',
  GOOGLE_CLIENT_ID: 'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
} as const; 