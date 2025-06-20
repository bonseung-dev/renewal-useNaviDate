export type Couple = {
  id: string; // 커플 고유 ID
  user_a_id: string; // 초대하는 유저
  user_b_id: string | null; // 초대받는 유저
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  created_at: string;
};
