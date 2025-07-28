import { NextRequest } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = await getAuthToken();

  if (!token) {
    throw new ApiError(401, '인증 토큰이 필요합니다.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP ${response.status} 오류가 발생했습니다.`,
      errorData,
    );
  }

  return response;
}

// 서버 사이드에서 토큰 가져오기
export async function getAuthToken(): Promise<string | null> {
  try {
    // 서버 사이드에서만 cookies() 사용
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      return cookieStore.get('authToken')?.value || null;
    }
  } catch (error) {
    // 서버 사이드에서 cookies() 사용할 수 없는 경우
  }

  // 클라이언트 사이드에서는 localStorage 사용
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    );
  }
  return null;
}

// 클라이언트 사이드에서 토큰 가져오기
export function getClientAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return (
      localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    );
  }
  return null;
}

export function setAuthToken(token: string, rememberMe: boolean = false): void {
  if (typeof window !== 'undefined') {
    if (rememberMe) {
      localStorage.setItem('authToken', token);
    } else {
      sessionStorage.setItem('authToken', token);
    }
  }
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }
}

export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function validateToken(token: string | null): boolean {
  return token !== null && token.length > 0;
}

// 쿠키에서 토큰 가져오기 (클라이언트 사이드)
export function getTokenFromCookie(): string | null {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('authToken='),
    );
    if (authCookie) {
      return authCookie.split('=')[1];
    }
  }
  return null;
}
