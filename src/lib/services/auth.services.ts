import { BASE_URL } from '@/constants/url.constants';
import { Couple } from '@/types/couple.type';
import { User } from '@/types/user.type';

// 사용자 로그인 함수
export const loginUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const response = await fetch(
    `${BASE_URL}/users?email=${encodeURIComponent(email)}`,
  );
  if (!response.ok) throw new Error('서버 오류가 발생했습니다.');

  const users: User[] = await response.json();
  if (users.length === 0) throw new Error('등록된 이메일이 없습니다.');

  const user = users[0];
  if (user.password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  return user;
};

// 커플 정보 조회 함수
export const fetchCouple = async (
  userId: number,
): Promise<Couple | undefined> => {
  const response = await fetch(`${BASE_URL}/couples`);
  const couples: Couple[] = await response.json();
  return couples.find((c) => c.userAId === userId || c.userBId === userId);
};

// 서버 쿠키 설정 함수
export const setServerCookies = async (data: {
  userId: number;
  coupleId?: number;
  anniversary?: string;
}) => {
  const res = await fetch('/api/auth/set-cookies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('쿠키 설정 실패');
  return res;
};
