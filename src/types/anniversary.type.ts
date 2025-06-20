export type Anniversary = {
  id: string;
  couple_id: string;
  title: string;
  date: string;
  repeat: RepeatOption;
  memo?: string;
  created_by: string;
};

export type RepeatOption = 'NONE' | 'YEARLY' | 'DAILY' | 'HUNDRED_DAYS';
