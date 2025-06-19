import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import {
  generateAutoAnniversaries,
  initializeDummyData,
} from '../utils/anniversary.utils';
import { STORAGE_KEY } from '@/constants/holiday.constants';

// 백엔드 연결 후: 이 함수는 api를 가져오는 것으로 대체
// 자동 생성 기념일은 서버에서 계산하거나, 클라이언트에서 여전히 생성 가능
export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  initializeDummyData(coupleId); // 테스트용 더미 데이터 초기화
  const auto = generateAutoAnniversaries(startDate, coupleId);
  const custom = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  const all = [...auto, ...custom.filter((a) => a.couple_id === coupleId)];
  const oneYearLater = dayjs().add(1, 'year');
  return all.filter((a) => dayjs(a.date).isBefore(oneYearLater));
};

// 백엔드 연결 후 대체
export const addAnniversary = (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
): Anniversary => {
  const newAnniversary: Anniversary = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    couple_id: coupleId,
  };
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
  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  const updatedList = current.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
};
