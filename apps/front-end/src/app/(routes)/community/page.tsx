import Community from '@/components/features/community/community';
import { getUserIdFromToken } from '@/lib/utils/cookes.utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community || useNavidate( )',
  description: '다른 커플들의 특별한 순간을 공유하고 소통해보세요',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - Community',
    description: '사랑의 순간을 함께 나누는 공간',
    images: '/navidate-logo_blue.png',
  },
};

const Page = async () => {
  const userId = await getUserIdFromToken();
  return <Community userId={Number(userId)} />;
};

export default Page;
