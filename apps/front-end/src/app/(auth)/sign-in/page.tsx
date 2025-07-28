'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LoginFormData, loginSchema } from '@/lib/zod/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/lib/mutations/auth.mutations';
import Link from 'next/link';

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
  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginFormData) => {
    setLoginError(null);
    loginMutation.mutate(data, {
      onError: (error: Error) => {
        setLoginError(error.message);
      },
    });
  };

  // monorepo 이전하고 추가
  const handleGoogleLogin = () => {
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
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">{loginError}</p>
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
          onClick={handleGoogleLogin}
        >
          <Image src="/icons/google.png" alt="google" width={24} height={24} />
        </button>
        <button
          type="button"
          className="rounded-full p-2 bg-skin2 cursor-not-allowed"
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

      {/* 회원가입 링크 - 임시로 추가*/}
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

export default Page;

// const SignInContent = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [formData, setFormData] = useState<LoginDto>({
//     email: '',
//     password: '',
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // URL 파라미터에서 에러 메시지 확인
//   useEffect(() => {
//     const errorParam = searchParams.get('error');
//     if (errorParam) {
//       setError(decodeURIComponent(errorParam));
//     }
//   }, [searchParams]);

//   // 쿠키에서 토큰 확인 (Google OAuth 콜백 후)
//   useEffect(() => {
//     const token = getTokenFromCookie();
//     if (token) {
//       // 토큰을 localStorage로 복사 (기존 로직과 호환)
//       setAuthToken(token, true);
//       router.push('/');
//     }
//   }, [router]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleGoogleLogin = () => {
//     // Google 로그인 시작 시 로딩 상태 설정
//     setIsLoading(true);
//   };

//   const handleGoogleSuccess = (user: any) => {
//     // Google 로그인 성공 처리
//     localStorage.setItem('user', JSON.stringify(user));
//     router.push('/');
//   };

//   const handleGoogleError = (error: string) => {
//     // Google 로그인 실패 처리
//     setError(error);
//     setIsLoading(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const data: AuthResponse = await AuthService.login(formData);

//       if (data.success) {
//         // JWT 토큰을 localStorage에 저장
//         setAuthToken(data.access_token!, true);
//         localStorage.setItem('user', JSON.stringify(data.user));

//         // 메인 페이지로 리다이렉트
//         router.push('/');
//       } else {
//         setError(data.message || '로그인에 실패했습니다.');
//       }
//     } catch (error) {
//       setError('서버 연결에 실패했습니다.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-skin4 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* 로고 */}
//         <div className="text-center mb-8">
//           <Image
//             src="/navidate-logo.png"
//             alt="NaviDate"
//             width={200}
//             height={60}
//             className="mx-auto"
//           />
//         </div>

//         {/* 로그인 폼 */}
//         <div className="bg-white rounded-2xl shadow-lg p-8">
//           <h2 className="text-2xl font-bold text-center text-skin1 mb-6">로그인</h2>

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-skin2 mb-2">
//                 이메일
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
//                 placeholder="이메일을 입력하세요"
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-skin2 mb-2">
//                 비밀번호
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-3 border border-skin5 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
//                 placeholder="비밀번호를 입력하세요"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-skin1 text-white py-3 px-4 rounded-lg hover:bg-skin2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? '로그인 중...' : '로그인'}
//             </button>
//           </form>

//           {/* 구분선 */}
//           <div className="my-6 flex items-center">
//             <div className="flex-1 border-t border-skin5"></div>
//             <span className="px-4 text-sm text-skin4">또는</span>
//             <div className="flex-1 border-t border-skin5"></div>
//           </div>

//           {/* Google 로그인 버튼 */}
//           <GoogleLoginButton
//             onLogin={handleGoogleLogin}
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             disabled={isLoading}
//           >
//             Google로 로그인
//           </GoogleLoginButton>

//           {/* 회원가입 링크 */}
//           <div className="text-center mt-6">
//             <span className="text-skin4">계정이 없으신가요? </span>
//             <Link href="/sign-up" className="text-skin1 hover:text-skin2 font-medium">
//               회원가입
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SignInPage = () => {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-skin4 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skin1"></div>
//       </div>
//     }>
//       <SignInContent />
//     </Suspense>
//   );
// };

// export default SignInPage;
