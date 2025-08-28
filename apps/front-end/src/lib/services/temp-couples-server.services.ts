import { BASE_URL } from '@/constants/url.constants';
import { Couple } from '@use-navi-date/shared';

export const getMyCouple = async (
  token: string,
  userId: number,
): Promise<Couple | null> => {
  try {
    // 1. API 호출로 커플 목록 가져오기
    const res = await fetch(`${BASE_URL}/couples`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('커플 데이터 불러오기 실패');
    }

    const result = await res.json();

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('잘못된 커플 데이터 형식');
    }

    // 2. 현재 사용자의 커플 찾기
    const myCouple = result.data.find(
      (c: Couple) => c.userAId === userId || c.userBId === userId,
    );

    return myCouple || null;
  } catch (error) {
    console.error('getMyCouple error:', error);
    throw error;
  }
};
