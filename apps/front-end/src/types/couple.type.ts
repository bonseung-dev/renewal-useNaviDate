export type Couple = {
  id: number; // 커플 고유 ID
  userAId: number; // 초대하는 유저
  userBId: number | null; // 초대받는 유저
  id: number; // 커플 고유 ID
  userAId: number; // 초대하는 유저
  userBId: number | null; // 초대받는 유저
  anniversary: string;
  name: string;
  status: CoupleStatus;
  createdAt: Date;
  status: CoupleStatus;
  createdAt: string;
};

// 커플의 상태를 나타내는 타입
export type CoupleStatus = 'pending' | 'confirm' | 'delete';

export type CoupleStatus = 'pending' | 'confirm' | 'delete';
