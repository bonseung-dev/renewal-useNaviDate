import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import {
  getServerCookie,
  getUserIdFromToken,
  getCoupleIdFromToken,
} from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { coupleId: number };
}): Promise<Metadata> {
  return {
    title: `커플 캘린더 | useNavidate( )`,
    description: `우리만의 특별한 날짜를 기록하는 공간`,
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

const Page = async ({ params }: Props) => {
  const token = getServerCookie('access_token');

  if (!token) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }

  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return <LoginPrompt authStatus="unauthenticated" />;
    }

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    const res = await fetch(`${backendUrl}/couples`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('커플 데이터 불러오기 실패');
    }

    const result = await res.json();
    // console.log('커플 목록:', result);

    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('잘못된 커플 데이터 형식');
    }

    const myCouple = result.data.find(
      (c: any) => c.userAId === Number(userId) || c.userBId === Number(userId),
    );

    if (!myCouple) {
      return <LoginPrompt authStatus="no-couple" userId={userId} />;
    }

    if (myCouple.id !== Number(params.coupleId)) {
      return <LoginPrompt authStatus="invalid-couple" userId={userId} />;
    }

    // console.log('내 커플:', myCouple);

    // 기념일 시작 날짜
    const startDate = myCouple.anniversary;

    // console.log('기념일 시작 날짜:', startDate);

    return (
      <section aria-labelledby="calendar-heading">
        <h1 id="calendar-heading" className="sr-only">
          커플 캘린더
        </h1>
        <CalendarTabs
          coupleId={myCouple.id}
          startDate={startDate}
          userId={Number(userId)}
          token={token}
        />
      </section>
    );
  } catch (error) {
    console.error(error);
    return <LoginPrompt authStatus="error" />;
  }
};

export default Page;
