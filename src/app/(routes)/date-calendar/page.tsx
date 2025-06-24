import { redirect } from 'next/navigation';
import LoginPrompt from '@/components/features/date-calendar/login-prompt';
import dummyData from '@/lib/utils/dummy.utils';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ searchParams }: Props) => {
  const userId = searchParams.userId as string | undefined;

  // 비로그인: userId 없음
  if (!userId) {
    console.log('No userId provided');
    return <LoginPrompt />;
  }

  // userId 유효성 검사
  const user = dummyData.users.find((u) => u.id === userId);
  if (!user) {
    console.log(`User not found for userId: ${userId}`);
    return <LoginPrompt />;
  }

  // 사용자가 속한 커플 찾기
  const couple = dummyData.couples.find(
    (c) => c.userAId === userId || c.userBId === userId,
  );
  if (!couple) {
    console.log(`No couple found for userId: ${userId}`);
    return <LoginPrompt />;
  }

  // 디버깅: 커플 정보
  console.log(
    `Found couple: ${couple.id}, userAId: ${couple.userAId}, userBId: ${couple.userBId}`,
  );

  // 커플 ID로 리다이렉트
  redirect(`/date-calendar/${couple.id}?userId=${userId}`);
};

export default Page;
