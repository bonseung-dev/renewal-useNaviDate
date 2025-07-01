export type Couple = {
  id: string; // 커플 고유 ID
  userAId: string; // 초대하는 유저
  userBId: string | null; // 초대받는 유저
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  createdAt: string;
};
