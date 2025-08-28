'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { LoginFormData, loginSchema } from '@/lib/zod/auth.schema';
import { AuthService } from '@/lib/api/services';
import GoogleLoginButton from '@/components/ui/google-login-button';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null);
    setIsPending(true);
    try {
      const res = await AuthService.login(data);
      if (res.success) {
        router.push('/community');
      } else {
        setLoginError(res.message || '로그인에 실패했습니다.');
      }
    } catch (err: any) {
      setLoginError(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
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

      {/* 이메일 */}
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

      {/* 비밀번호 */}
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
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">{loginError}</p>
      )}

      {/* 버튼 */}
      <button
        type="submit"
        className="w-[260px] h-[40px] mt-[24px] bg-skin1 text-b-h3 text-skin5 rounded-[8px] font-bold hover:bg-skin1/80 disabled:bg-skin1/50"
        disabled={isPending}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </button>

      {/* 구분선 */}
      <div className="flex items-center gap-2 w-[240px] mt-[24px]">
        <div className="flex-1 h-px bg-skin1" />
        <span className="text-b-h4 font-bold text-skin1">OR</span>
        <div className="flex-1 h-px bg-skin1" />
      </div>

      {/* 구글 로그인 */}
      <GoogleLoginButton />

      {/* 회원가입 링크 */}
      <div className="mt-6 text-center">
        <span className="text-b-h4 text-skin2">계정이 없으신가요? </span>
        <Link
          href="/sign-up"
          className="text-b-h4 font-bold text-skin1 hover:underline"
        >
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default SignInPage;
