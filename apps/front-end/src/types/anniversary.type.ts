import { Image } from './image.type';

export type Anniversary = {
  id: number;
  coupleId: number;
  title: string;
  date: string;
  repeat: RepeatOption;
  memo?: string;
  createdBy: Date;
};

export type RepeatOption = 'NONE' | 'YEARLY';

export type PartnerInfo = {
  id: number;
  profileImage: Image;
  nickname: string;
};

export type CoupleResponse = {
  userAId: number;
  userBId: number;
};

export type UserResponse = {
  profileImage?: Image;
  nickname?: string;
};
