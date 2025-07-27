// 클라이언트 전용 (useEffect 내에서 사용)
export const getClientCookie = (name: string): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return value ? decodeURIComponent(value) : undefined;
};
