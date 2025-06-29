import { CoupleResponse, UserResponse } from '@/types/anniversary.type';
import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';
import { BASE_URL } from '@/constants/url.constants';

export const fetchCoupleData = async (
  coupleId: string,
): Promise<CoupleResponse> => {
  const res = await fetch(`${BASE_URL}/couples/${coupleId}`);
  if (!res.ok) throw new Error('Failed to fetch couple data');
  return res.json();
};

export const fetchUserData = async (userId: string): Promise<UserResponse> => {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch user data');
  return res.json();
};

// 기념일 목록 가져오기
export const getAnniversaries = async (
  coupleId: string,
  startDate: string,
): Promise<Anniversary[]> => {
  try {
    // JSON-Server에서 커플의 기념일 가져오기
    const response = await fetch(
      `${BASE_URL}/anniversaries?coupleId=${coupleId}`,
    );
    if (!response.ok) throw new Error('Failed to fetch anniversaries');

    const customAnniversaries: Anniversary[] = await response.json();

    // 자동 생성 기념일
    const autoAnniversaries = generateAutoAnniversaries(startDate, coupleId);

    // 1년 이내의 기념일만 필터링하여 반환
    const oneYearLater = dayjs().add(1, 'year');
    return [...autoAnniversaries, ...customAnniversaries]
      .filter((a) => dayjs(a.date).isBefore(oneYearLater))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  } catch (error) {
    console.error('Error fetching anniversaries:', error);
    return [];
  }
};

// 기념일 추가
export const addAnniversary = async (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
  userId: string,
): Promise<Anniversary> => {
  try {
    const newAnniversary = {
      ...data,
      coupleId,
      createdBy: userId,
    };

    const response = await fetch(`${BASE_URL}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnniversary),
    });

    if (!response.ok) throw new Error('Failed to add anniversary');

    return await response.json();
  } catch (error) {
    console.error('Error adding anniversary:', error);
    throw error;
  }
};

// 기념일 수정
export const updateAnniversary = async (
  updatedAnniversary: Anniversary,
): Promise<Anniversary> => {
  try {
    const response = await fetch(
      `${BASE_URL}/anniversaries/${updatedAnniversary.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnniversary),
      },
    );

    if (!response.ok) throw new Error('Failed to update anniversary');

    return await response.json();
  } catch (error) {
    console.error('Error updating anniversary:', error);
    throw error;
  }
};

// 기념일 삭제
export const deleteAnniversary = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete anniversary');
  } catch (error) {
    console.error('Error deleting anniversary:', error);
    throw error;
  }
};
