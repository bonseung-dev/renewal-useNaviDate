import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { getServerCookie } from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { coupleId: string };
}): Promise<Metadata> {
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

  if (!finalUserId || !finalCoupleId || finalCoupleId !== params.coupleId) {
    console.error('데이터 로딩 실패:', {
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
    <section aria-labelledby="calendar-heading">
      <h1 id="calendar-heading" className="sr-only">
        커플 캘린더
      </h1>
      <CalendarTabs
        coupleId={params.coupleId}
        startDate={startDate}
        userId={finalUserId}
      />
    </section>
  );
};

export default Page;
