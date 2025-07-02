import { Couple as SharedCouple } from '@use-navi-date/shared';

// 기존 타입과의 호환성을 위한 확장
export type Couple = SharedCouple & {
  // 기존 필드들을 유지하면서 shared 타입을 확장
  anniversary?: string;
  status?: 'pending' | 'confirm' | 'delete';
};

// 기존 타입과의 호환성을 위한 별칭 (deprecated - shared 타입 사용 권장)
export type CoupleLegacy = {
  id: string; // 커플 고유 ID
  userAId: string; // 초대하는 유저
  userBId: string | null; // 초대받는 유저
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  createdAt: string;
};
