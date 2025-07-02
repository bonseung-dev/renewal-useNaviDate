'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/features/nav/header';
import Footer from '@/components/features/nav/footer';
import { User, Image } from '@use-navi-date/shared';

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL 파라미터에서 토큰 확인 (OAuth 콜백 처리)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (token && success === 'true') {
      // 토큰을 localStorage에 저장
      localStorage.setItem('token', token);
      
      // 사용자 정보를 백엔드에서 가져오기
      fetchUserProfile(token);
      
      // URL에서 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error) {
      console.error('로그인 에러:', error);
      // URL에서 파라미터 제거
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsLoading(false);
    } else {
      // localStorage에서 사용자 정보 확인
      const storedToken = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (storedToken && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('사용자 정보 파싱 오류:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
      const response = await fetch(`${backendUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          setUser(data.user);
        } else {
          throw new Error('프로필 조회 실패');
        }
      } else {
        throw new Error('프로필 조회 실패');
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/sign-in');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col items-center">
        <Header />
        <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-skin1"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Header */}
      <Header />

      {/* 메인영역 */}
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5">
        {user ? (
          // 로그인된 사용자
          <div className="text-center py-8">
            <div className="mb-6">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
              ) : (
                <div className="w-20 h-20 bg-skin3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl text-skin1 font-bold">
                    {(user.nickname || user.email).charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <h1 className="text-2xl font-bold text-skin1 mb-2">안녕하세요, {user.nickname || user.email}님!</h1>
              <p className="text-skin4 mb-6">오늘도 특별한 데이트를 기록해보세요</p>
            </div>
            
            <div className="space-y-4">
              <a 
                href="/date-calendar" 
                className="block w-full bg-skin1 text-white py-3 px-6 rounded-lg hover:bg-skin2 transition-colors"
              >
                데이트 캘린더 보기
              </a>
              <a 
                href="/couple-space" 
                className="block w-full bg-skin3 text-skin1 py-3 px-6 rounded-lg hover:bg-skin2 transition-colors"
              >
                커플 스페이스
              </a>
              <a 
                href="/write-date" 
                className="block w-full bg-skin6 text-skin1 py-3 px-6 rounded-lg hover:bg-skin2 transition-colors"
              >
                데이트 기록하기
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-skin5">
              <button
                onClick={handleLogout}
                className="text-skin4 hover:text-skin1 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          // 로그인되지 않은 사용자
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-skin1 mb-4">NaviDate</h1>
            <p className="text-skin4 mb-6">데이트를 기록하고 추억을 만들어보세요</p>
            <div className="space-y-4">
              <a 
                href="/sign-in" 
                className="block w-full bg-skin1 text-white py-3 px-6 rounded-lg hover:bg-skin2 transition-colors"
              >
                로그인하기
              </a>
              <a 
                href="/sign-up" 
                className="block w-full bg-skin3 text-skin1 py-3 px-6 rounded-lg hover:bg-skin2 transition-colors"
              >
                회원가입하기
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Gradient */}
      <div className="absolute bottom-[52px] w-full max-w-[360px] h-[62px] bg-gradient-to-t from-skin5/100 to-skin5/0 pointer-events-none z-10" />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
