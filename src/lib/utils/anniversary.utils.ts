import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import dummyData from '../utils/dummy.utils';
import { STORAGE_KEY } from '@/constants/anniversary.constants';

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

export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  const couple = dummyData.couples.find((c) => c.id === coupleId);
  const coupleStartDate = couple
    ? couple.anniversary.toISOString().split('T')[0]
    : startDate;

  const auto = generateAutoAnniversaries(coupleStartDate, coupleId);

  const dummyCustom = dummyData.anniversaries
    .filter((a) => a.coupleId === coupleId)
    .map((a) => ({
      id: a.id,
      coupleId: a.coupleId,
      title: a.title,
      date: a.date,
      repeat: a.repeat.toUpperCase() as 'NONE' | 'YEARLY',
      createdBy: a.createdBy,
    }));

  const localCustom = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];

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

export const addAnniversary = (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
  userId: string,
): Anniversary => {
  const newId = `user-id-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newAnniversary: Anniversary = {
    ...data,
    id: newId,
    coupleId: coupleId,
    createdBy: userId,
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

export const updateAnniversary = (
  updatedAnniversary: Anniversary,
): Anniversary => {
  if (updatedAnniversary.id.startsWith('anni-')) {
    throw new Error('DUMMY_DATA_EDIT');
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

export const deleteAnniversary = (id: string): void => {
  if (id.startsWith('anni-')) {
    throw new Error('DUMMY_DATA_DELETE');
  }

  const current = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  const updatedList = current.filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
};
