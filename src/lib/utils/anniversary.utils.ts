import { Anniversary } from '@/types/anniversary.type';
import dayjs from 'dayjs';

// 자동 생성 기념일 (클라이언트 측에서 생성)
export const generateAutoAnniversaries = (
  startDate: string,
  coupleId: string,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  let idCounter = 0;

  return days.map((day) => {
    idCounter++;
    return {
      id: `auto-id-${idCounter.toString().padStart(6, '0')}`,
      coupleId: coupleId,
      title: `${day}일`,
      date: dayjs(startDate).add(day, 'day').format('YYYY-MM-DD'),
      repeat: 'NONE',
      createdBy: 'system',
    };
  });
};

export const calculateDDay = (date: string): string => {
  const today = dayjs().startOf('day');
  const targetDate = dayjs(date).startOf('day');
  const diff = targetDate.diff(today, 'day');

  if (diff === 0) return 'D-Day';
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
};
