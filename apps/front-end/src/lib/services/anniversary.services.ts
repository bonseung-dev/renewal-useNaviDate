import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';
import { BASE_URL } from '@/constants/url.constants';
import { CoupleResponse, UserResponse } from '@use-navi-date/shared';

// couples.services.ts로 분리 예정
export const getCoupleById = async (
  coupleId: number,
  token: string,
): Promise<CoupleResponse> => {
  const res = await fetch(`/api/couples/${coupleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('커플 정보를 불러오는데 실패했습니다');
  const json = await res.json();
  // console.log('커플 정보 요청:', json);
  if (!json.success)
    throw new Error(json.message || '커플 정보를 불러오는데 실패했습니다');

  return json.data;
};

// users.services.ts로 분리 예정
export const getUserById = async (
  userId: number,
  token: string,
): Promise<UserResponse> => {
  const res = await fetch(`/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('사용자 정보를 불러오는데 실패했습니다');

  const json = await res.json();
  if (!json.success)
    throw new Error(json.message || '사용자 정보를 불러오는데 실패했습니다');

  return json.data;
};

export const getAllAnniversariesByCoupleId = async (
  coupleId: number,
  startDate: string,
  token?: string,
): Promise<Anniversary[]> => {
  try {
    // 500오류가 발생
    // const res2 = await fetch(`/api/anniversaries/couple/${coupleId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log('기념일 응답:', res2);

    const res = await fetch(`/api/anniversaries`, {
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
