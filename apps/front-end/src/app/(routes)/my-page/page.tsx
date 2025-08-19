import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import MyPageTabs from '@/components/features/my-page/my-page-tabs';
import MyProfileHeader from '@/components/features/my-page/my-profile-header';
import { getServerCookie, getUserIdFromToken } from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '마이페이지 || useNavidate( )',
  description: '회원님의 정보 및 활동 내역을 확인할 수 있습니다',
  metadataBase: new URL('https://usenavi.sorune.org'),
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - 마이페이지',
    description: '내 정보와 활동을 확인하세요',
    images: '/navidate-logo_blue.png',
  },
};

const page = async () => {
  const token = getServerCookie('access_token');
  if (!token) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }
  const userId = await getUserIdFromToken();

  return (
    <section aria-labelledby="calendar-heading" className="px-4">
      <h1 id="calendar-heading" className="sr-only">
        마이페이지
      </h1>

      <MyProfileHeader userId={Number(userId)} token={token} />

      <div className="mt-[38px]">
        <MyPageTabs userId={Number(userId)} token={token} />
      </div>
    </section>
  );
};

export default page;
