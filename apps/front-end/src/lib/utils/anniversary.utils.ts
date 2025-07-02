import dayjs from 'dayjs';
import { Anniversary } from '@use-navi-date/shared';
import { STORAGE_KEY } from '@/constants/holiday.constants';

export const generateAutoAnniversaries = (
  startDate: string,
  coupleId: string,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  return days.map((day) => ({
    id: generateId(),
    coupleId: coupleId,
    title: `${day}일`,
    date: dayjs(startDate).add(day, 'day').format('YYYY-MM-DD'),
    repeat: 'NONE',
    createdBy: 'system',
  }));
};

// 백엔드 연결 후: 이 함수는 테스트용 더미 데이터를 생성하므로 삭제할 예정
// API에서 사용자 커스텀 기념일을 가져오는 엔드포인트로 대체
export const getDummyCustomAnniversaries = (
  coupleId: string,
): Anniversary[] => {
  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  return [
    {
      id: generateId(),
      coupleId: coupleId,
      title: '남자친구 생일',
      date: '2025-08-15',
      repeat: 'YEARLY',
      createdBy: 'user',
    },
    {
      id: generateId(),
      coupleId: coupleId,
      title: '내 생일',
      date: '2025-10-10',
      repeat: 'YEARLY',
      createdBy: 'user',
    },
    {
      id: generateId(),
      coupleId: coupleId,
      title: '처음 여행간 날',
      date: '2025-07-20',
      repeat: 'NONE',
      createdBy: 'user',
    },
    {
      id: generateId(),
      coupleId: coupleId,
      title: '첫 데이트',
      date: '2024-12-25',
      repeat: 'NONE',
      createdBy: 'user',
    },
  ];
};

// 초기화 함수: localStorage에 더미 데이터를 저장
// 백엔드 연결 후: 이 함수는 삭제해야 하며, 대신 API 호출로 데이터를 초기화
export const initializeDummyData = (coupleId: string) => {
  const existingData = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  if (existingData.length === 0) {
    const dummyData = getDummyCustomAnniversaries(coupleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  }
};
