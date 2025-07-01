'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CreateUserDto, AuthResponse } from '@use-navi-date/shared';
import { setAuthToken } from '@/lib/utils/api';
import { AuthService } from '@/lib/api/services';

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateUserDto & { confirmPassword: string }>({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSignUp = () => {
    // 새로운 API 라우트 사용
    window.location.href = '/api/auth/google';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setIsLoading(false);
      return;
    }

    // 비밀번호 길이 확인
    if (formData.password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      setIsLoading(false);
      return;
    }

    try {
      const data: AuthResponse = await AuthService.register({
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      });

      if (data.success) {
        // JWT 토큰을 localStorage에 저장
        setAuthToken(data.access_token!, true);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // 메인 페이지로 리다이렉트
        router.push('/');
      } else {
        setError(data.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-skin1 mb-6">회원가입</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-skin2 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-skin2 mb-2">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
                minLength={2}
                className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-skin2 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
                placeholder="비밀번호를 입력하세요 (최소 6자)"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-skin2 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
                placeholder="비밀번호를 다시 입력하세요"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-skin1 text-white py-3 px-4 rounded-lg hover:bg-skin2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </button>
          </form>

          {/* 구분선 */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-skin5"></div>
            <span className="px-4 text-sm text-skin4">또는</span>
            <div className="flex-1 border-t border-skin5"></div>
          </div>

          {/* Google 회원가입 버튼 */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full bg-white border border-skin5 text-skin2 py-3 px-4 rounded-lg hover:bg-skin4 transition-colors flex items-center justify-center space-x-2"
          >
            <Image
              src="/icons/google.png"
              alt="Google"
              width={20}
              height={20}
            />
            <span>Google로 회원가입</span>
          </button>

          {/* 로그인 링크 */}
          <div className="text-center mt-6">
            <span className="text-skin4">이미 계정이 있으신가요? </span>
            <Link href="/sign-in" className="text-skin1 hover:text-skin2 font-medium">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
