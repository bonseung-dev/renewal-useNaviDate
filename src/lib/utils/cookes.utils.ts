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

// 클라이언트 전용 (useEffect 내에서 사용)
export const getClientCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return value ? decodeURIComponent(value) : undefined;
};
