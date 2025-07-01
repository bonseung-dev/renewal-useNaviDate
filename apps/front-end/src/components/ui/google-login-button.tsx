'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getBackendUrl } from '@/lib/utils/env';

interface GoogleLoginButtonProps {
  onLogin?: () => void;
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onLogin,
  onSuccess,
  onError,
  className = '',
  children,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // 콜백 함수가 있으면 실행
      if (onLogin) {
        onLogin();
      }

      // 백엔드에서 Google OAuth URL 가져오기
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/auth/google/url`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Google OAuth URL을 가져올 수 없습니다.');
      }

      const data = await response.json();
      
      if (data.success && data.url) {
        // Google OAuth 페이지로 리다이렉트
        window.location.href = data.url;
      } else {
        throw new Error(data.message || 'Google OAuth를 시작할 수 없습니다.');
      }
    } catch (error) {
      console.error('Google 로그인 오류:', error);
      if (onError) {
        onError(error instanceof Error ? error.message : 'Google 로그인에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={disabled || isLoading}
      className={`w-full bg-white border border-skin5 text-skin2 py-3 px-4 rounded-lg hover:bg-skin4 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <Image
        src="/icons/google.png"
        alt="Google"
        width={20}
        height={20}
      />
      <span>{isLoading ? '처리 중...' : (children || 'Google로 로그인')}</span>
    </button>
  );
};

export default GoogleLoginButton; 