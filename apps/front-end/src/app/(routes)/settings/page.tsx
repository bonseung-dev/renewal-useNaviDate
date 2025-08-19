import SettingsSwitches from '@/components/features/settings/settings-swtiches';
import LogoutButton from '@/components/ui/log-out-button';
import { getServerCookie } from '@/lib/utils/cookes.utils';
import { ChevronRight, Store } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '환경설정 || useNavidate( )',
  description: '알림 / 테마 등을 설정할 수 있습니다',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - 환경설정',
    description: '알림 및 테마 등 환경설정을 변경하세요',
    images: '/navidate-logo_blue.png',
  },
};

const Page = () => {
  const isLoggedIn = !!getServerCookie('access_token');
  return (
    <div className="w-[320px] h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-[20px]">
        <h1 className="text-b-h2 font-bold text-skin1">환경설정</h1>
        <LogoutButton isLoggedIn={isLoggedIn} />
      </header>

      {/* 구분선 */}
      <div className="w-[320px] h-[1px] bg-skin3 mt-[20px]" />

      {/* 세팅 옵션 */}
      <SettingsSwitches />

      {/* 구분선 */}
      <div className="w-[320px] h-[1px] bg-skin3 mt-[20px]" />

      {/* 상점 링크 */}
      <Link
        href="/settings" //임시로
        className=" w-[320px] h-[52px] mt-[20px] rounded-full bg-skin1 text-skin5 flex items-center justify-center gap-2 hover:bg-skin6 hover:text-font3"
      >
        <Store size={18} />
        <span className="text-b-h1 font-bold">상점 페이지</span>
      </Link>

      {/* 링크 목록 */}
      <nav className="mt-[20px] px-[20px]">
        <ul className="flex flex-col gap-[16px]">
          {['약관정책', '공지사항', '튜토리얼', '개발자 소개', '회원탈퇴'].map(
            (text) => (
              <li key={text}>
                <Link
                  href="/settings" //임시로
                  className="flex items-center justify-between text-m-h3 text-font2 hover:text-skin1 hover:font-bold"
                >
                  <span>{text}</span>
                  <ChevronRight size={14} />
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Page;
