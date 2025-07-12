import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { getServerCookie } from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { coupleId: number };
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
  params: { coupleId: number };
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ params, searchParams }: Props) => {
  // 1. 쿠키 및 URL 파라미터에서 값 가져오기
  const [userIdCookie, coupleIdCookie, anniversary] = await Promise.all([
    getServerCookie('userId'),
    getServerCookie('coupleId'),
    getServerCookie('anniversary'),
  ]);

  const userId = userIdCookie || searchParams.userId;
  const coupleId = coupleIdCookie || params.coupleId.toString();

  // 2. 필수 값 검증
  if (!userId || !coupleId) {
    console.error('파라미터 검증:', { userId, coupleId });
    return <LoginPrompt />;
  }

  // 3. coupleId 일치 여부 확인
  if (coupleId !== params.coupleId.toString()) {
    console.error('커플 아이디 불일치:', {
      paramCoupleId: params.coupleId,
      storedCoupleId: coupleId,
    });
    return <LoginPrompt />;
  }

  // 4. 시작 날짜 설정
  const startDate = anniversary
    ? new Date(anniversary).toISOString().split('T')[0]
    : '';

  return (
    <section aria-labelledby="calendar-heading">
      <h1 id="calendar-heading" className="sr-only">
        커플 캘린더
      </h1>
      <CalendarTabs
        coupleId={Number(coupleId)}
        startDate={startDate}
        userId={Number(userId)}
      />
    </section>
  );
};

export default Page;
