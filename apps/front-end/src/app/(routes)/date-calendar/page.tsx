import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { getMyCouple } from '@/lib/services/temp-couples-server.services';
import { getServerCookie, getUserIdFromToken } from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '커플 캘린더 시작하기 || useNavidate( )',
  description: '커플 캘린더를 이용해보세요',
  metadataBase: new URL('https://usenavi.sorune.org'),
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - 커플 캘린더',
    description: '특별한 날짜를 함께 기록하세요',
    images: '/navidate-logo_blue.png',
  },
};

const Page = async () => {
  const token = getServerCookie('access_token');

  if (!token) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }

  const userId = await getUserIdFromToken();
  if (!userId) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }

  const myCouple = await getMyCouple(token, Number(userId));

  if (myCouple) {
    redirect(`/date-calendar/${myCouple.id}`);
  }

  return <LoginPrompt authStatus="no-couple" />;
};

export default Page;
