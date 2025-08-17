'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { registerSchema, RegisterFormData } from '@/lib/zod/register.schema';
import { AuthService } from '@/lib/api/services';
import { useRouter } from 'next/navigation';
import GoogleLoginButton from '@/components/ui/google-login-button';
import Link from 'next/link';

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setSignUpError(null);
    setIsPending(true);
    try {
      const res = await AuthService.register({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      });
      if (res.success) {
        router.push('/sign-in');
      } else {
        setSignUpError(res.message || '회원가입에 실패했습니다.');
      }
    } catch (err: any) {
      setSignUpError(err.message || '회원가입 중 오류가 발생했습니다.');
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
          <h1 className="text-b-h0 font-bold text-skin1">SIGN UP</h1>
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

      {/* 닉네임 */}
      <div className="w-[260px] mt-[10px]">
        <input
          placeholder="닉네임을 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('nickname')}
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
          {...register('password')}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.password?.message}
        </p>
      </div>

      {/* 비밀번호 확인 */}
      <div className="w-[260px] mt-[10px]">
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('confirmPassword')}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.confirmPassword?.message}
        </p>
      </div>

      {/* 에러 메시지 */}
      {signUpError && (
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">{signUpError}</p>
      )}

      {/* 버튼 */}
      <button
        type="submit"
        className="w-[260px] h-[40px] mt-[24px] bg-skin1 text-b-h3 text-skin5 rounded-[8px] font-bold hover:bg-skin1/80 disabled:bg-skin1/50"
        disabled={isPending}
      >
        {isPending ? '가입 중...' : '회원가입'}
      </button>

      {/* 구분선 */}
      <div className="flex items-center gap-2 w-[240px] mt-[24px]">
        <div className="flex-1 h-px bg-skin1" />
        <span className="text-b-h4 font-bold text-skin1">OR</span>
        <div className="flex-1 h-px bg-skin1" />
      </div>

      {/* 구글 로그인 */}
      <GoogleLoginButton />

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

export default SignUpPage;
