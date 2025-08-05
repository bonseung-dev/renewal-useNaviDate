/**
 * 환경 변수 유틸리티 함수들
 */

// 환경 확인
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// 백엔드 URL
export const getBackendUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BACKEND_URL is not defined');
  }
  return url;
};

// 프론트엔드 URL
export const getFrontendUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }
  return url;
};

// Google OAuth 설정
export const getGoogleConfig = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL;
  
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined');
  }
  
  return {
    clientId,
    redirectUri: redirectUri || `${getFrontendUrl()}/auth/callback`,
  };
};

// API 설정
export const getApiConfig = () => {
  return {
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
    enableDebug: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  };
};

// 환경 정보 출력 (개발 환경에서만)
export const logEnvironmentInfo = () => {
  if (isDevelopment) {
    console.log('🌍 Environment Info:', {
      NODE_ENV: process.env.NODE_ENV,
      BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      FRONTEND_URL: process.env.NEXT_PUBLIC_BASE_URL,
      GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Not Set',
    });
  }
}; 