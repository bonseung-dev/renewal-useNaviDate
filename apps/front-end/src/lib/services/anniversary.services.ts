import dayjs from 'dayjs';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';
import { Anniversary } from '@use-navi-date/shared';
import { BASE_URL } from '@/constants/url.constants';

export const getAllAnniversariesByCoupleId = async (
  coupleId: number,
  startDate: string,
  token?: string,
): Promise<Anniversary[]> => {
  try {
    const res = await fetch(`${BASE_URL}/anniversaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('기념일 목록을 불러오는데 실패했습니다');

    // console.log('기념일 응답:', res);
    const resData = await res.json();
    // console.log('기념일 목록 응답:', resData);
    const customAnniversaries: Anniversary[] = resData.data.filter(
      (a: Anniversary) => a.coupleId === coupleId,
    );
    const autoAnniversaries: Anniversary[] = generateAutoAnniversaries(
      startDate,
      coupleId,
    );

    const oneYearLater = dayjs().add(1, 'year');
    return [...autoAnniversaries, ...customAnniversaries]
      .filter((a) => dayjs(a.date).isBefore(oneYearLater))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  } catch (error) {
    console.error('기념일 목록 조회 중 오류 발생:', error);
    return [];
  }
};

export const createAnniversary = async (
  coupleId: number,
  data: Omit<Anniversary, 'id'>,
  token?: string,
): Promise<Anniversary> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const newAnniversary = {
      ...data,
      coupleId,
      createdBy: coupleId,
    };

    const res = await fetch(`${BASE_URL}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAnniversary),
    });

    if (!res.ok) throw new Error('기념일 생성에 실패했습니다');
    return await res.json();
  } catch (error) {
    console.error('기념일 생성 중 오류 발생:', error);
    throw error;
  }
};

export const updateAnniversaryById = async (
  id: number,
  data: Anniversary,
  token?: string,
): Promise<Anniversary> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const res = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('기념일 수정에 실패했습니다');
    return await res.json();
  } catch (error) {
    console.error('기념일 수정 중 오류 발생:', error);
    throw error;
  }
};

export const deleteAnniversaryById = async (
  id: number,
  token?: string,
): Promise<void> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const res = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('기념일 삭제에 실패했습니다');
  } catch (error) {
    console.error('기념일 삭제 중 오류 발생:', error);
    throw error;
  }
};
