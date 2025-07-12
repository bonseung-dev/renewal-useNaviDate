import { CoupleResponse, UserResponse } from '@/types/anniversary.type';
import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';
import { BASE_URL } from '@/constants/url.constants';

// couples.services.ts로 분리 예정
export const getCoupleById = async (
  coupleId: number,
): Promise<CoupleResponse> => {
  const res = await fetch(`${BASE_URL}/couples?id=${coupleId}`);
  if (!res.ok) throw new Error('커플 정보를 불러오는데 실패했습니다');

  const data = await res.json();

  if (Array.isArray(data)) return data[0];

  return data;
};

// users.services.ts로 분리 예정
export const getUserById = async (userId: number): Promise<UserResponse> => {
  const res = await fetch(`${BASE_URL}/users?id=${userId}`);
  if (!res.ok) throw new Error('사용자 정보를 불러오는데 실패했습니다');

  const data = await res.json();

  if (Array.isArray(data)) return data[0];

  return data;
};

export const getAllAnniversariesByCoupleId = async (
  coupleId: number,
  startDate: string,
): Promise<Anniversary[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/anniversaries?coupleId=${coupleId}`,
    );
    if (!response.ok) throw new Error('기념일 목록을 불러오는데 실패했습니다');

    const customAnniversaries: Anniversary[] = await response.json();
    const autoAnniversaries = generateAutoAnniversaries(startDate, coupleId);

    const oneYearLater = dayjs().add(1, 'year');
    return [...autoAnniversaries, ...customAnniversaries]
      .filter((a) => dayjs(a.date).isBefore(oneYearLater))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  } catch (error) {
    console.error('기념일 목록 조회 중 오류 발생:', error);
    return [];
  }
};

// 현재 json-server에서는 id를 string으로 자동생성하므로,
// id를 number로 변경한 시점에서 제대로 작동하지 않을 수 있습니다.

export const createAnniversary = async (
  coupleId: number,
  data: Omit<Anniversary, 'id'>,
): Promise<Anniversary> => {
  try {
    const newAnniversary = {
      ...data,
      coupleId,
      createdBy: new Date(),
    };

    const response = await fetch(`${BASE_URL}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnniversary),
    });

    if (!response.ok) throw new Error('기념일 생성에 실패했습니다');
    return await response.json();
  } catch (error) {
    console.error('기념일 생성 중 오류 발생:', error);
    throw error;
  }
};

export const updateAnniversaryById = async (
  id: number,
  data: Anniversary,
): Promise<Anniversary> => {
  try {
    const response = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('기념일 수정에 실패했습니다');
    return await response.json();
  } catch (error) {
    console.error('기념일 수정 중 오류 발생:', error);
    throw error;
  }
};

export const deleteAnniversaryById = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('기념일 삭제에 실패했습니다');
  } catch (error) {
    console.error('기념일 삭제 중 오류 발생:', error);
    throw error;
  }
};
