import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { getServerCookie } from '@/lib/utils/cookes.utils';

import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { coupleId: string };
}): Promise<Metadata> {
  // 비동기로 쿠키 가져오기
  const coupleName = await getServerCookie('coupleName');

  return {
    title: `${coupleName || '커플'}의 캘린더 | useNavidate( )`,
    description: `${coupleName || '우리'}만의 특별한 날짜를 기록하는 공간`,
    openGraph: {
      images: ['/navidate-logo_blue.png'],
    },
    alternates: {
      canonical: `/date-calendar/${params.coupleId}`,
    },
  };
}

type Props = {
  params: { coupleId: string };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
  const [userId, coupleId, anniversary] = await Promise.all([
    getServerCookie('userId'),
    getServerCookie('coupleId'),
    getServerCookie('anniversary'),
  ]);

  const finalUserId = userId || searchParams.userId;
  const finalCoupleId = coupleId;

  // 디버깅 로그 강화
  console.log('Auth Debug:', {
    storedUserId: userId,
    paramUserId: searchParams.userId,
    storedCoupleId: coupleId,
    paramCoupleId: params.coupleId,
    anniversaryExists: !!anniversary,
  });

  if (!finalUserId || !finalCoupleId || finalCoupleId !== params.coupleId) {
    console.error('Auth Failed:', {
      condition: !finalUserId
        ? 'No UserID'
        : !finalCoupleId
          ? 'No CoupleID'
          : 'ID Mismatch',
    });
    return <LoginPrompt />;
  }

  const startDate = anniversary
    ? new Date(anniversary).toISOString().split('T')[0]
    : '';

  return (
    <CalendarTabs
      coupleId={params.coupleId}
      startDate={startDate}
      userId={finalUserId}
    />
  );
};

export default Page;
