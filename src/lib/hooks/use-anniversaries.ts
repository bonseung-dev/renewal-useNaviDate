import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import {
  generateAutoAnniversaries,
  getDummyCustomAnniversaries,
} from '../utils/anniversary.utils';

let customAnniversaries: Anniversary[] = [];

export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  const auto = generateAutoAnniversaries(startDate, coupleId);
  const custom = getDummyCustomAnniversaries(coupleId);
  customAnniversaries = custom; // 초기 데이터 저장
  const all = [...auto, ...custom];

  // 오늘 기준 1년 이내
  const oneYearLater = dayjs().add(1, 'year');
  return all.filter((a) => dayjs(a.date).isBefore(oneYearLater));
};

export const addAnniversary = (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
): Anniversary => {
  const newAnniversary: Anniversary = {
    ...data,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    couple_id: coupleId,
  };

  customAnniversaries.push(newAnniversary);
  return newAnniversary;
};
