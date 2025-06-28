import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import dummyData from '@/lib/utils/dummy.utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { coupleId: string };
}): Promise<Metadata> {
  const couple = dummyData.couples.find((c) => c.id === params.coupleId);

  return {
    title: `${couple?.name || '커플'}의 캘린더 |   useNavidate( )`,
    description: `${couple?.name || '우리'}만의 특별한 날짜를 기록하는 공간`,
    openGraph: {
      images: ['/navidate-logo_blue.png'], //나중에 커플 이미지 || 디폴트 이미지로 해도 좋을 듯
    },
    alternates: {
      canonical: `/date-calendar/${params.coupleId}`,
    },
  };
}

type Props = {
  params: { coupleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params, searchParams }: Props) => {
  // 현재 더미 데이터 사용 중 (백엔드 연동시 API 호출로 변경 필요)
  const userId = searchParams.userId as string | undefined;
  const couple = dummyData.couples.find((c) => c.id === params.coupleId);

  // 커플이 존재하지 않으면 404 페이지 표시
  // 백엔드 연동시 API 응답에 따라 처리 방식 변경 필요
  if (!couple) {
    console.log(`coupleId에 해당하는 커플을 찾을 수 없음: ${params.coupleId}`);
    notFound();
  }

  // 임시 인증 처리 (백엔드 연동시 세션/토큰 검증으로 대체 예정)
  if (!userId || ![couple.userAId, couple.userBId].includes(userId)) {
    console.log(
      `유효하지 않은 userId: ${userId} (coupleId: ${params.coupleId})`,
    );
    return <LoginPrompt />;
  }

  console.log(
    `캘린더 렌더링 - coupleId: ${params.coupleId}, userId: ${userId}`,
  );

  // 임시 시작 날짜 (백엔드 연동시 커플 생성일 등 동적 데이터로 변경 예정)
  const startDate = '2024-04-01';

  return (
    <CalendarTabs
      coupleId={params.coupleId}
      startDate={startDate}
      userId={userId}
    />
  );
};

export default Page;
