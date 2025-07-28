import { Image } from '@/types/image.type';

// test용 상수 - 백엔드 연동 후 삭제 예정
export const STORAGE_KEY = 'custom_anniversaries';

export const PLACEHOLDER_IMAGE: Image = {
  id: -1,
  url: '/placeholder-image.png',
  filename: 'placeholder.png',
  originalName: 'placeholder.png',
  mimeType: 'image/png',
  size: 0,
  path: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const DEFAULT_NICKNAME = '애인 이름';
