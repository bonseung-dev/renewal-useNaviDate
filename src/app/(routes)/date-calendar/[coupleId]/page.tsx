import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import dummyData from '@/lib/utils/dummy.utils';
import { notFound } from 'next/navigation';

type Props = {
  params: { coupleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ params, searchParams }: Props) => {
  const userId = searchParams.userId as string | undefined;
  const couple = dummyData.couples.find((c) => c.id === params.coupleId);

  // 커플이 존재하지 않으면 404
  if (!couple) {
    console.log(`coupleId에 해당하는 커플을 찾을 수 없음: ${params.coupleId}`);
    notFound();
  }

  // 비로그인 또는 유효하지 않은 userId
  if (!userId || ![couple.userAId, couple.userBId].includes(userId)) {
    console.log(
      `유효하지 않은 userId: ${userId} (coupleId: ${params.coupleId})`,
    );
    return <LoginPrompt />;
  }

  console.log(
    `캘린더 렌더링 - coupleId: ${params.coupleId}, userId: ${userId}`,
  );

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
