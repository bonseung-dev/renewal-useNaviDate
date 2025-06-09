export type Anniversary = {
  id: string;
  couple_id: string;
  title: string;
  date: string;
  repeat: 'none' | 'yearly';
  memo?: string;
  created_by: string;
};
