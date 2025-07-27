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

const Page = async ({ params, searchParams }: Props) => {
  const token = getServerCookie('access_token');

  if (!token) {
    return <LoginPrompt authStatus="unauthenticated" />;
  }

  try {
    const userId = await getUserIdFromToken();
    if (!userId) {
      return <LoginPrompt authStatus="unauthenticated" />;
    }

    const coupleId = await getCoupleIdFromToken();

    // 커플이 없거나 URL과 불일치하는 경우
    if (!coupleId) {
      return <LoginPrompt authStatus="no-couple" userId={userId} />;
    }
    if (coupleId !== params.coupleId.toString()) {
      return <LoginPrompt authStatus="invalid-couple" userId={userId} />;
    }

    // 기념일 정보 조회
    let startDate = '';
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/couples/${coupleId}/anniversary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        startDate = data.anniversary
          ? new Date(data.anniversary).toISOString().split('T')[0]
          : '';
      }
    } catch (error) {
      console.error('Failed to get anniversary:', error);
    }

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
  } catch (error) {
    return <LoginPrompt authStatus="error" />;
  }
};

export default Page;
