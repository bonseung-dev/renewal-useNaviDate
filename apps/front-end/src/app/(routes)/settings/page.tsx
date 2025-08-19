import LogoutButton from '@/components/features/nav/log-out-test';
import SettingsSwitches from '@/components/features/settings/settings-swtiches';
import { getServerCookie } from '@/lib/utils/cookes.utils';
import { ChevronRight, Store } from 'lucide-react';

const Page = () => {
  const isLoggedIn = !!getServerCookie('access_token');
  return (
    <div className="w-[320px] pt-[12px] h-[454px]">
      {/* Header */}
      <div className="flex items-center justify-between px-[20px]">
        <h1 className="text-b-h2 font-bold text-skin1">환경설정</h1>
        <LogoutButton isLoggedIn={isLoggedIn} />
      </div>

      {/* 구분선 */}
      <div className="w-[320px] h-[1px] bg-skin3 mt-[20px]" />

      {/* 세팅 옵션*/}
      <SettingsSwitches />

      {/* 구분선 */}
      <div className="w-[320px] h-[1px] bg-skin3 mt-[20px]" />

      {/* 상점 페이지 버튼 */}
      <button className="w-[320px] h-[52px] mt-[20px] rounded-full bg-skin1 text-skin5 flex items-center justify-center gap-2 hover:bg-skin6 hover:text-font3">
        <Store size={18} />
        <span className="text-b-h1 font-bold">상점 페이지</span>
      </button>

      {/* Links */}
      <div className="flex flex-col mt-[20px] gap-[16px] px-[20px]">
        {['약관정책', '공지사항', '튜토리얼', '개발자 소개'].map((text) => (
          <button
            key={text}
            className="flex items-center justify-between text-m-h3 text-font2 hover:text-skin1 hover:font-bold"
          >
            <span>{text}</span>
            <ChevronRight size={14} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Page;
