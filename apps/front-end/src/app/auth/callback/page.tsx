'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthCallbackContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const success = searchParams.get('success');
        const errorParam = searchParams.get('error');
        
        // 쿠키 확인 (디버깅용)
        console.log('🔍 쿠키 확인:', document.cookie);
        
        if (success === 'true') {
          // 성공 시 메인 페이지로 리다이렉트
          console.log('🔍 OAuth 성공, 메인 페이지로 리다이렉트');
          router.push('/');
        } else if (errorParam) {
          // 실패 시 에러 메시지 표시
          console.error('🔍 OAuth 오류:', decodeURIComponent(errorParam));
          setError(decodeURIComponent(errorParam));
        } else {
          console.error('🔍 알 수 없는 오류');
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } catch (err) {
        console.error('OAuth 콜백 처리 오류:', err);
        setError('인증 처리 중 오류가 발생했습니다.');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">인증 실패</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/auth/sign-in')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">인증 처리 중...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
} 