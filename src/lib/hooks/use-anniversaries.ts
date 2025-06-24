import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import { STORAGE_KEY } from '@/constants/holiday.constants';
import dummyData from '../utils/dummy.utils';

// 백엔드 연결 후: 이 함수는 api를 가져오는 것으로 대체
// 자동 생성 기념일은 서버에서 계산하거나, 클라이언트에서 여전히 생성 가능
export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  // 커플의 사귀기 시작 날짜
  const couple = dummyData.couples.find((c) => c.id === coupleId);
  const coupleStartDate = couple
    ? couple.anniversary.toISOString().split('T')[0]
    : startDate;

  // 자동 생성 기념일
  const auto = generateAutoAnniversaries(coupleStartDate, coupleId);

  // dummyData의 사용자 기념일
  const dummyCustom = dummyData.anniversaries
    .filter((a) => a.coupleId === coupleId)
    .map((a) => ({
      id: a.id,
      coupleId: a.coupleId,
      title: a.title,
      date: a.date,
      repeat: a.repeat.toUpperCase() as 'NONE' | 'YEARLY',
      createdBy: a.createdBy, // userAId 또는 userBId 유지
    }));

  // localStorage의 사용자 기념일
  const localCustom = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];

  // 결합 및 필터링
  const all = [
    ...auto,
    ...dummyCustom,
    ...localCustom.filter((a) => a.coupleId === coupleId),
  ];
  const oneYearLater = dayjs().add(1, 'year');
  return all
    .filter((a) => dayjs(a.date).isBefore(oneYearLater))
    .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
};

// 백엔드 연결 후 대체
export const addAnniversary = (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
  userId: string, // userId 추가
): Anniversary => {
  const newId = `user-id-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newAnniversary: Anniversary = {
    ...data,
    id: newId,
    coupleId: coupleId,
    createdBy: userId,
  };
  dummyData.anniversaries.push({
    ...newAnniversary,
    coupleId: coupleId,
    createdBy: userId,
    memo: `새로운 기념일: ${data.title}`,
    repeat: data.repeat.toLowerCase() as 'NONE' | 'YEARLY',
  });
  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...current, newAnniversary]),
  );
  return newAnniversary;
};

// 백엔드 연결 후 대체
export const updateAnniversary = (
  updatedAnniversary: Anniversary,
): Anniversary => {
  const index = dummyData.anniversaries.findIndex(
    (a) => a.id === updatedAnniversary.id,
  );

  if (index !== -1) {
    dummyData.anniversaries[index] = {
      ...updatedAnniversary,
      repeat: updatedAnniversary.repeat.toLowerCase() as 'NONE' | 'YEARLY',
    };
  }

  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];

  const updatedList = current.map((a) =>
    a.id === updatedAnniversary.id ? updatedAnniversary : a,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

  return updatedAnniversary;
};

// 백엔드 연결 후 대체
export const deleteAnniversary = (id: string): void => {
  dummyData.anniversaries = dummyData.anniversaries.filter((a) => a.id !== id);
  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  const updatedList = current.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
};

const generateAutoAnniversaries = (
  startDate: string,
  coupleId: string,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  let idCounter = dummyData.anniversaries.length;

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
