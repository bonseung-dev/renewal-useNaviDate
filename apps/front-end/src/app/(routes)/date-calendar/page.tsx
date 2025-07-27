import { redirect } from 'next/navigation';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import { Metadata } from 'next';
import { getServerCookie } from '@/lib/utils/cookes.utils';

export const metadata: Metadata = {
  title: '커플 캘린더 시작하기 || useNavidate( )',
  description: '커플 캘린더를 이용해보세요',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - 커플 캘린더',
    description: '특별한 날짜를 함께 기록하세요',
    images: '/navidate-logo_blue.png',
  },
};

type Props = {
  searchParams: { [key: string]: string | undefined };
};

const Page = async ({ searchParams }: Props) => {
  const userId = (await getServerCookie('userId')) || searchParams.userId;
  const coupleId = await getServerCookie('coupleId');

  if (!userId || !coupleId) {
    console.error('데이터 로딩 실패:', { userId, coupleId });
    return <LoginPrompt />;
  }

  // URL 인코딩 처리
  const encodedCoupleId = encodeURIComponent(coupleId);
  const encodedUserId = encodeURIComponent(userId);

  redirect(`/date-calendar/${encodedCoupleId}?userId=${encodedUserId}`);
};

export default Page;

// // 테스트용 상수 (개발 환경에서만 사용)
// const TEST_COUPLE_ID = '1';
// const TEST_START_DATE = '2024-01-01';
// const TEST_USER_ID = '1';

// const page = () => {
//   return <CalendarTabs coupleId={TEST_COUPLE_ID} startDate={TEST_START_DATE} userId={TEST_USER_ID} />;
// };

// export default page;
