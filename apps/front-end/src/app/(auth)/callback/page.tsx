'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { setAuthToken, getTokenFromCookie } from '@/lib/utils/api';

const OAuthCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const success = searchParams.get('success');
        const error = searchParams.get('error');

        if (success === 'true') {
          // 성공적인 OAuth 로그인
          const token = getTokenFromCookie();
          
          if (token) {
            // 토큰을 localStorage에 저장
            setAuthToken(token, true);
            
            // 사용자 정보 가져오기 (선택사항)
            try {
              const response = await fetch('/api/auth/profile', {
                credentials: 'include',
              });
              
              if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('user', JSON.stringify(userData.user));
              }
            } catch (error) {
              console.warn('사용자 정보를 가져올 수 없습니다:', error);
            }

            setStatus('success');
            setMessage('로그인이 성공했습니다!');
            
            // 잠시 후 메인 페이지로 리다이렉트
            setTimeout(() => {
              router.push('/');
            }, 2000);
          } else {
            throw new Error('인증 토큰을 찾을 수 없습니다.');
          }
        } else if (error) {
          // OAuth 로그인 실패
          setStatus('error');
          setMessage(decodeURIComponent(error));
          
          // 잠시 후 로그인 페이지로 리다이렉트
          setTimeout(() => {
            router.push('/sign-in?error=' + encodeURIComponent(error));
          }, 3000);
        } else {
          // 예상치 못한 상태
          setStatus('error');
          setMessage('알 수 없는 오류가 발생했습니다.');
          
          setTimeout(() => {
            router.push('/sign-in');
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
        setMessage('로그인 처리 중 오류가 발생했습니다.');
        
        setTimeout(() => {
          router.push('/sign-in');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-skin4 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-8">
          <Image
            src="/navidate-logo.png"
            alt="NaviDate"
            width={200}
            height={60}
            className="mx-auto"
          />
        </div>

        {/* 상태 표시 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {status === 'loading' && (
            <>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skin1 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-skin1 mb-2">로그인 처리 중...</h2>
              <p className="text-skin4">잠시만 기다려주세요.</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-green-500 text-4xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-skin1 mb-2">로그인 성공!</h2>
              <p className="text-skin4">{message}</p>
              <p className="text-sm text-skin4 mt-2">메인 페이지로 이동합니다...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-red-500 text-4xl mb-4">✗</div>
              <h2 className="text-xl font-semibold text-skin1 mb-2">로그인 실패</h2>
              <p className="text-red-600">{message}</p>
              <p className="text-sm text-skin4 mt-2">로그인 페이지로 이동합니다...</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallbackPage; 