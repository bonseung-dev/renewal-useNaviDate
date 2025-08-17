import { Anniversary } from '@use-navi-date/shared';
import dayjs from 'dayjs';

// 자동 생성 기념일 (클라이언트 측에서 생성)
export const generateAutoAnniversaries = (
  startDate: string,
  coupleId: number,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  const SYSTEM_MEMO = '[SYSTEM]'; // 시스템 생성 표시

  return days.map((day, index) => ({
    id: -Math.abs(index + 1),
    coupleId,
    title: `${day}일`,
    date: dayjs(startDate).add(day, 'day').format('YYYY-MM-DD'),
    repeat: 'NONE',
    createdBy: -(index + 1),
    createdAt: new Date(startDate),
    memo: `${SYSTEM_MEMO} 자동 생성 기념일`,
  }));
};

// 시스템 생성 여부 확인 (타입 가드 포함)
export const isSystemAnniversary = (anniversary: Anniversary): boolean => {
  return anniversary.memo?.includes('[SYSTEM]') ?? false;
};

export const calculateDDay = (date: string): string => {
  const today = dayjs().startOf('day');
  const targetDate = dayjs(date).startOf('day');
  const diff = targetDate.diff(today, 'day');

  if (diff === 0) return 'D-Day';
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
};
