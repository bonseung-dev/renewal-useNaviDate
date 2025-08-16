import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { getMyCouple } from '@/lib/services/temp-couples-server.services';
import { getServerCookie, getUserIdFromToken } from '@/lib/utils/cookes.utils';
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

    const myCouple = await getMyCouple(token, Number(userId));

    if (!myCouple) {
      return <LoginPrompt authStatus="no-couple" />;
    }

    if (myCouple.id !== Number(params.coupleId)) {
      return <LoginPrompt authStatus="invalid-couple" coupleId={myCouple.id} />;
    }

    return (
      <section aria-labelledby="calendar-heading">
        <h1 id="calendar-heading" className="sr-only">
          커플 캘린더
        </h1>
        <CalendarTabs
          coupleId={myCouple.id}
          startDate={myCouple.anniversary}
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
