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
