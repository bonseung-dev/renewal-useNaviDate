import { BASE_URL } from '@/constants/url.constants';
import { Couple } from '@/types/couple.type';
import { User } from '@/types/user.type';

// 사용자 로그인 함수
export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '로그인에 실패했습니다.');
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '알 수 없는 오류 발생',
    );
  }
};

// 커플 정보 조회 함수
export const fetchCouple = async (userId: number): Promise<Couple | null> => {
  try {
    const response = await fetch(`${BASE_URL}/couples?userId=${userId}`);
    if (!response.ok) throw new Error('커플 정보 조회 실패');

    const couples: Couple[] = await response.json();
    const couple = couples.find(
      (c) =>
        c.userAId === userId || (c.userBId !== null && c.userBId === userId),
    );

    return couple || null;
  } catch (error) {
    console.error('Fetch couple error:', error);
    return null;
  }
};

// 서버 쿠키 설정 함수
export const setServerCookies = async (data: {
  userId: number;
  coupleId?: number;
  anniversary?: string;
}): Promise<void> => {
  try {
    const res = await fetch('/api/auth/set-cookies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        userId: data.userId.toString(),
        coupleId: data.coupleId?.toString(),
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || '쿠키 설정 실패');
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '쿠키 설정 중 오류 발생',
    );
  }
};
