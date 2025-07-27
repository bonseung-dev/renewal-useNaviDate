import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// 서버 전용 (절대 클라이언트에서 사용 X)
export const getServerCookie = (name: string): string | undefined => {
  try {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value;
  } catch (error) {
    console.error(`Cookie Error (${name}):`, error);
    return undefined;
  }
};

export const getUserIdFromToken = (): string | undefined => {
  const token = getServerCookie('access_token');
  if (!token) return undefined;

  try {
    const decoded = jwt.decode(token) as { sub?: string };
    return decoded?.sub;
  } catch (error) {
    console.error('Token decode error:', error);
    return undefined;
  }
};

export const getCoupleIdFromToken = async (): Promise<string | undefined> => {
  const token = getServerCookie('access_token');
  if (!token) return undefined;

  try {
    const userId = getUserIdFromToken();
    if (!userId) return undefined;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      },
    );

    if (!response.ok) {
      if (response.status === 404) return undefined;
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.coupleId || undefined;
  } catch (error) {
    console.error('Failed to get coupleId:', error);
    return undefined;
  }
};
