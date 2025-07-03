import { cookies } from 'next/headers';

// 서버 전용 (절대 클라이언트에서 사용 X)
export const getServerCookie = (name: string): string | undefined => {
  try {
    const cookieStore = cookies();
    const value = cookieStore.get(name)?.value;
    if (!value) {
      console.warn(`[SERVER] Cookie not found: ${name}`);
      return undefined;
    }
    return value;
  } catch (error) {
    console.error(`[SERVER] Cookie Error (${name}):`, error);
    return undefined;
  }
};
