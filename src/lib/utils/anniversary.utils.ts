import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';

export const generateAutoAnniversaries = (
  startDate: string,
  coupleId: string,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  return days.map((day) => ({
    id: generateId(),
    couple_id: coupleId,
    title: `${day}일`,
    date: dayjs(startDate).add(day, 'day').format('YYYY-MM-DD'),
    repeat: 'NONE',
    created_by: 'system',
  }));
};

export const getDummyCustomAnniversaries = (
  coupleId: string,
): Anniversary[] => {
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  return [
    {
      id: generateId(),
      couple_id: coupleId,
      title: '남자친구 생일',
      date: '2025-08-15',
      repeat: 'YEARLY',
      created_by: 'user',
    },
    {
      id: generateId(),
      couple_id: coupleId,
      title: '내 생일',
      date: '2025-10-10',
      repeat: 'YEARLY',
      created_by: 'user',
    },
    {
      id: generateId(),
      couple_id: coupleId,
      title: '처음 여행간 날',
      date: '2025-07-20',
      repeat: 'NONE',
      created_by: 'user',
    },
  ];
};
