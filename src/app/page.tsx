import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const HomePage = () => {
  // 임시 로그인 상태 (실제로는 인증 상태 확인)
  const isLoggedIn = false; // ← 실제 구현시 수정 필요

  // 로그인 상태면 커뮤니티로 리디렉트
  if (isLoggedIn) {
    redirect('/community');
  }

  return (
    <div className="max-w-[360px] mx-auto min-h-screen flex flex-col items-center justify-center bg-skin6 px-4 py-6">
      {/* 로고 영역 */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex flex-col items-center">
          <Image
            src="/navidate-logo.png"
            width={30}
            height={30}
            alt="useNaviDate 로고"
            className="object-contain mb-1"
          />
          <span className="text-b-h2 font-bold text-skin1 writing-vertical">
            useNaviDate( )
          </span>
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="w-full flex flex-col items-center justify-center flex-grow gap-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-b-h1 font-bold text-skin1">
            우리들의 데이트 기록
          </h1>
          <p className="text-b-body1 text-skin1">
            소중한 순간을 기록하고 추억해보세요
          </p>
        </div>

        {/* 버튼 그룹 */}
        <div className="w-full flex flex-col gap-3">
          <Link href="/sign-in" className="w-full">
            <Button className="w-full h-[50px] bg-skin5 text-skin1 rounded-full text-b-subtitle1 hover:bg-skin5/80 active:bg-skin5/80 transition-colors">
              로그인 하기
            </Button>
          </Link>

          <Link href="/community" className="w-full">
            <Button
              variant="outline"
              className="w-full h-[50px] border-skin5 text-skin5 rounded-full text-b-subtitle1 hover:bg-skin5/80 active:bg-skin6/70 transition-colors"
            >
              둘러보기
            </Button>
          </Link>
        </div>
      </div>

      {/* 푸터 */}
      <div className="w-full mt-auto pt-6 text-center text-b-caption1 text-skin1">
        <p>© 2023 useNaviDate. All rights reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
