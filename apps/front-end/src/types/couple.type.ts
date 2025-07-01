import { Couple as SharedCouple } from '@use-navi-date/shared';

// 기존 타입과의 호환성을 위한 확장
export type Couple = SharedCouple & {
  // 기존 필드들을 유지하면서 shared 타입을 확장
  anniversary?: string;
  status?: 'pending' | 'confirm' | 'delete';
};

// 기존 타입과의 호환성을 위한 별칭
export type CoupleLegacy = {
  id: string; // 커플 고유 ID
  user_a_id: string; // 초대하는 유저
  user_b_id: string | null; // 초대받는 유저
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  created_at: string;
};
