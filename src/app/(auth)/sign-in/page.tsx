'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Couple, User } from '@/types/community.type';

type FormData = {
  email: string;
  password: string;
};

// 커플 정보 조회 함수
const fetchCouple = async (userId: string): Promise<Couple | undefined> => {
  try {
    const response = await fetch(`http://localhost:4000/couples`);
    const couples: Couple[] = await response.json();
    return couples.find((c) => c.userAId === userId || c.userBId === userId);
  } catch (error) {
    console.error('커플 정보 조회 실패:', error);
    return undefined;
  }
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const [loginError, setLoginError] = useState<string | null>(null);

  // 로그인 요청 Mutation
  const loginMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch(
        `http://localhost:4000/users?email=${encodeURIComponent(data.email)}`,
      );
      if (!response.ok) throw new Error('서버 오류가 발생했습니다.');

      const users: User[] = await response.json();
      if (users.length === 0) throw new Error('등록된 이메일이 없습니다.');

      const user = users[0];
      if (user.password !== data.password) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      return user;
    },
    // 로그인 성공 핸들러 수정
    onSuccess: async (user: User) => {
      try {
        const couple = await fetchCouple(user.id);

        // 1. localStorage 저장
        localStorage.setItem('userId', user.id);
        if (couple) {
          localStorage.setItem('coupleId', couple.id);
          localStorage.setItem('anniversary', couple.anniversary);
        }

        // 2. API를 통해 서버 쿠키 설정
        const res = await fetch('/api/auth/set-cookies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            coupleId: couple?.id,
            anniversary: couple?.anniversary,
          }),
        });

        if (!res.ok) throw new Error('쿠키 설정 실패');

        // 3. 쿠키 적용을 위한 전체 페이지 리로드
        window.location.href = `/date-calendar/${couple?.id}?userId=${user.id}`;
      } catch (error) {
        console.error('Login Error:', error);
        setLoginError('로그인 처리 실패');
      }
    },
    onError: (error: Error) => {
      setLoginError(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
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
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '유효한 이메일 형식이 아닙니다',
            },
          })}
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
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: { value: 8, message: '비밀번호는 최소 8자여야 합니다' },
          })}
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
