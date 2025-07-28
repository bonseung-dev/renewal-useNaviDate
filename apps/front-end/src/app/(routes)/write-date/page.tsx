import WriteDate from '@/components/features/write-date/write-date';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WriteDate || useNavidate( )',
  description: '다른 커플들의 특별한 순간을 공유하고 소통해보세요',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - WritePost',
    description: '사랑의 순간을 기록하는 공간',
    images: '/navidate-logo_blue.png',
  },
};

const WriteDatePage = () => {
  return <WriteDate />;
};

export default WriteDatePage;
