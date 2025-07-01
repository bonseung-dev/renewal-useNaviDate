import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

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
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// 서버 사이드에서 토큰 가져오기
export async function getServerAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('authToken')?.value || null;
  } catch (error) {
    return null;
  }
}

export async function fetchWithServerAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getServerAuthToken();
  
  if (!token) {
    throw new ApiError(401, '인증 토큰이 필요합니다.');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP ${response.status} 오류가 발생했습니다.`,
      errorData
    );
  }

  return response;
}

export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
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