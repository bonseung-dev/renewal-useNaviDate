import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import {
  generateAutoAnniversaries,
  getDummyCustomAnniversaries,
} from '../utils/anniversary.utils';

export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  const auto = generateAutoAnniversaries(startDate, coupleId);
  const custom = getDummyCustomAnniversaries(coupleId);
  const all = [...auto, ...custom];

  // 오늘 기준 1년 이내
  const oneYearLater = dayjs().add(1, 'year');
  return all.filter((a) => dayjs(a.date).isBefore(oneYearLater));
};
