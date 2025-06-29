'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { LoginFormData, loginSchema } from '@/lib/zod/auth.schema';
import {
  fetchCouple,
  loginUser,
  setServerCookies,
} from '@/lib/services/auth.services';
import { AUTH_ERRORS } from '@/constants/auth.constants';
import { zodResolver } from '@hookform/resolvers/zod';

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      loginUser(email, password),
    onSuccess: async (user) => {
      try {
        const couple = await fetchCouple(user.id);

        // 로컬 스토리지 저장
        localStorage.setItem('userId', user.id);
        if (couple) {
          localStorage.setItem('coupleId', couple.id);
          localStorage.setItem('anniversary', couple.anniversary);
        }

        // 서버 쿠키 설정
        await setServerCookies({
          userId: user.id,
          coupleId: couple?.id,
          anniversary: couple?.anniversary,
        });

        // 페이지 리다이렉트
        window.location.href = `/date-calendar/${couple?.id}?userId=${user.id}`;
      } catch (error) {
        console.error('Login Error:', error);
        setLoginError(AUTH_ERRORS.LOGIN_FAILED);
      }
    },
    onError: (error: Error) => {
      setLoginError(error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[360px] h-[640px] bg-white flex flex-col items-center justify-center px-6 py-4 mx-auto"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-center gap-1">
        <Image
          src="/navidate-logo_blue.png"
          alt="logo"
          width={55}
          height={55}
        />
        <div className="flex flex-col items-start">
          <h1 className="text-b-h0 font-bold text-skin1">LOGIN</h1>
          <span className="text-skin1 text-b-h4 font-bold -mt-1">
            useNavidate( )
          </span>
        </div>
      </div>

      {/* 이메일 입력 */}
      <div className="w-[260px] mt-[30px]">
        <input
          placeholder="이메일을 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('email')}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.email?.message}
        </p>
      </div>

      {/* 비밀번호 입력 */}
      <div className="w-[260px] mt-[10px]">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('password')}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.password?.message}
        </p>
      </div>

      {/* 에러 메시지 */}
      {loginError && (
        <p className="text-m-h4 text-red-500 mt-2 h-[14px]">{loginError}</p>
      )}

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-[260px] h-[40px] mt-[24px] bg-skin1 text-b-h3 text-skin5 rounded-[8px] font-bold hover:bg-skin1/80 disabled:bg-skin1/50"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </button>

      {/* 소셜 로그인 구분선 */}
      <div className="flex items-center gap-2 w-[240px] mt-[24px]">
        <div className="flex-1 h-px bg-skin1" />
        <span className="text-b-h4 font-bold text-skin1">OR</span>
        <div className="flex-1 h-px bg-skin1" />
      </div>

      {/* 소셜 로그인 버튼 */}
      <div className="flex gap-[22px] mt-[16px]">
        <button
          type="button"
          className="rounded-full p-2 bg-skin2"
          onClick={() => console.log('Google 로그인')}
        >
          <Image src="/icons/google.png" alt="google" width={24} height={24} />
        </button>
        <button
          type="button"
          className="rounded-full p-2 bg-skin2"
          onClick={() => console.log('Kakao 로그인')}
        >
          <Image
            src="/icons/kakao-talk.png"
            alt="kakao"
            width={24}
            height={24}
          />
        </button>
      </div>
    </form>
  );
};

export default Page;
