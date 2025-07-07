export type Anniversary = {
  id: string;
  coupleId: string;
  title: string;
  date: string;
  repeat: RepeatOption;
  memo?: string;
  createdBy: string;
};

export type RepeatOption = 'NONE' | 'YEARLY';

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
