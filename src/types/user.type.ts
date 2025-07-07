import { Image } from './image.type';

export type User = {
  id: number;
  email: string;
  password: string;
  nickname: string;
  profileImage: Image;
  createdAt: string;
  tempToken?: string;
};
