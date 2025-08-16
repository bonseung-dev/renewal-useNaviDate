'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { AuthService } from '@/lib/api/services';
import { CreateUserDto } from '@use-navi-date/shared';

type FormData = {
  email: string;
  nickname: string;
  password: string;
  confirm: string;
};

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      const userData: CreateUserDto = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };

      const response = await AuthService.register(userData);

      if (response.success) {
        // 회원가입 성공 시 로그인 페이지로 이동
        router.push('/sign-in?message=회원가입이 완료되었습니다. 로그인해주세요.');
      } else {
        setError(response.message || '회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      setError('서버 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // monorepo 이전하고 추가
  const handleGoogleSignUp = () => {
    // 새로운 API 라우트 사용
    window.location.href = '/api/auth/google';
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
          <h1 className="text-b-h0 font-bold text-skin1">SIGN UP</h1>
          <span className="text-skin1 text-b-h4 font-bold -mt-1">
            useNavidate( )
          </span>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && (
        <div className="w-[260px] mt-[10px] p-2 bg-red-50 border border-red-200 text-red-600 rounded-[8px] text-sm">
          {error}
        </div>
      )}

      {/* 이메일 */}
      <div className="w-[260px] mt-[30px]">
        <input
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('email', {
            required: '이메일을 입력해주세요',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '올바른 이메일 형식이 아닙니다',
            },
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.email?.message}
        </p>
      </div>

      {/* 닉네임 */}
      <div className="w-[260px] mt-[10px]">
        <input
          placeholder="닉네임을 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('nickname', {
            required: '닉네임을 입력해주세요',
            minLength: { value: 2, message: '닉네임은 최소 2자여야 합니다' },
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.nickname?.message}
        </p>
      </div>

      {/* 비밀번호 */}
      <div className="w-[260px] mt-[10px]">
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            minLength: { value: 6, message: '비밀번호는 최소 6자여야 합니다' },
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.password?.message}
        </p>
      </div>

      {/* 비밀번호 확인 */}
      <div className="w-[260px] mt-[10px]">
        <input
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('confirm', {
            validate: (val) =>
              val === watch('password') || '비밀번호가 일치하지 않습니다',
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.confirm?.message}
        </p>
      </div>

      {/* 회원가입 버튼 */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-[260px] h-[40px] mt-[24px] bg-skin1 text-b-h3 text-skin5 rounded-[8px] font-bold hover:bg-skin1/80 disabled:bg-skin1/50"
      >
        {isLoading ? '회원가입 중...' : '회원가입'}
      </button>

      {/* -- or -- */}
      <div className="flex items-center gap-2 w-[240px] mt-[24px]">
        <div className="flex-1 h-px bg-skin1" />
        <span className="text-b-h4 font-bold text-skin1">OR</span>
        <div className="flex-1 h-px bg-skin1" />
      </div>

      {/* 소셜 회원가입 */}
      <div className="flex gap-[22px] mt-[16px]">
        <button
          type="button"
          className="rounded-full p-2 bg-skin2"
          onClick={handleGoogleSignUp}
        >
          <Image src="/icons/google.png" alt="google" width={24} height={24} />
        </button>
        <button className="rounded-full p-2 bg-skin2 cursor-not-allowed">
          <Image
            src="/icons/kakao-talk.png"
            alt="kakao"
            width={24}
            height={24}
          />
        </button>
      </div>

      {/* 로그인 링크 */}
      <div className="mt-6 text-center">
        <span className="text-b-h4 text-skin2">이미 계정이 있으신가요? </span>
        <Link
          href="/sign-in"
          className="text-b-h4 font-bold text-skin1 hover:underline"
        >
          로그인
        </Link>
      </div>
    </form>
  );
};

export default Page;