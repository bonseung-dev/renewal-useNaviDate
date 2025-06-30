// 클라이언트 전용 (useEffect 내에서 사용)
export const getClientCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return value ? decodeURIComponent(value) : undefined;
};

// 모든 쿠키 삭제 함수
export const deleteAllCookies = () => {
  if (typeof document === 'undefined') return;
  document.cookie.split(';').forEach((cookie) => {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });
};
