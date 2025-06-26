'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';

type FormData = {
  username: string;
  password: string;
  confirm: string;
};

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('로그인 요청:', data);
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
            useNavidate()
          </span>
        </div>
      </div>

      {/* 아이디 */}
      <div className="w-[260px] mt-[30px]">
        <input
          placeholder="아이디를 입력해주세요"
          className="w-full h-[40px] px-3 py-2 bg-skin3 rounded-[8px] outline-none text-l-title4 font-light text-font4"
          {...register('username', {
            required: '아이디를 입력해주세요',
            validate: (val) =>
              !val.includes('admin') || '사용할 수 없는 아이디입니다',
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.username?.message}
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
            minLength: { value: 8, message: '비밀번호는 최소 8자여야 합니다' },
          })}
        />
        <p className="text-m-h4 text-skin7 mt-2 h-[14px]">
          {errors.password?.message}
        </p>
      </div>

      {/* 로그인 버튼 */}
      <button
        type="submit"
        className="w-[260px] h-[40px] mt-[24px] bg-skin1 text-b-h3 text-skin5 rounded-[8px] font-bold hover:bg-skin1/80"
      >
        로그인
      </button>

      {/* -- or -- */}
      <div className="flex items-center gap-2 w-[240px] mt-[24px]">
        <div className="flex-1 h-px bg-skin1" />
        <span className="text-b-h4 font-bold text-skin1">OR</span>
        <div className="flex-1 h-px bg-skin1" />
      </div>

      {/* 소셜 로그인 */}
      <div className="flex gap-[22px] mt-[16px]">
        <button className="rounded-full p-2 bg-skin2">
          <Image src="/icons/google.png" alt="google" width={24} height={24} />
        </button>
        <button className="rounded-full p-2 bg-skin2">
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
