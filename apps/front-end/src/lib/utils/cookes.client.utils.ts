// cookies.client.utils.ts

// 클라이언트에서만 사용할 수 있는 util

// access_token 쿠키에서 JWT 추출
export const getAccessTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/(^|;) ?access_token=([^;]*)(;|$)/);
  return match ? decodeURIComponent(match[2]) : null;
};

// JWT 파싱
export const parseJwt = (token: string): any | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    );
    return JSON.parse(payload);
  } catch (error) {
    console.error('❌ JWT 파싱 실패:', error);
    return null;
  }
};

// UUID를 가져오는 함수 (sub 필드 사용)
export const getUserUUIDFromToken = (): string | null => {
  const token = getAccessTokenFromCookie();
  if (!token) {
    console.warn('❌ access_token 쿠키 없음');
    return null;
  }

  const decoded = parseJwt(token);
  if (!decoded || !decoded.sub) {
    console.warn('❌ JWT에 sub 필드 없음');
    return null;
  }

  return decoded.sub; // UUID 문자열
};
