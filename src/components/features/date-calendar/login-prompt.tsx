'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dummyData from '@/lib/utils/dummy.utils';

const LoginPrompt = () => {
  const router = useRouter();

  const handleCoupleSelect = (coupleId: string, userAId: string) => {
    router.push(`/date-calendar/${coupleId}?userId=${userAId}`);
  };

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-b-h2 text-font3 font-bold mb-4">로그인 필요</h2>
      <p className="text-m-h4 text-font2 mb-4">
        캘린더를 보려면 로그인이 필요합니다.
      </p>
      <Link
        href="/sign-in"
        className="py-2 px-8 text-skin1 text-L-title3 border-2 border-skin1 rounded hover:bg-skin1 hover:text-white transition"
      >
        로그인하기
      </Link>
      <div className="mt-8 w-full max-w-md">
        <h3 className="text-b-h3 text-font3 font-bold mb-4 text-center">
          또는 커플을 선택하세요
        </h3>
        <div className="flex flex-col gap-3">
          {dummyData.couples.map((couple, index) => (
            <button
              key={couple.id}
              onClick={() => handleCoupleSelect(couple.id, couple.userAId)}
              className="py-2 px-8 text-skin1 text-L-title3 border-2 border-skin1 rounded hover:bg-skin1 hover:text-white transition"
            >
              커플 {index + 1}: {couple.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
