import DateDetail from '@/components/features/date-detail/date-detail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DateDetail || useNavidate( )',
  description: '다른 커플들의 특별한 순간을 공유하고 소통해보세요',
  robots: {
    index: false,
  },
  openGraph: {
    title: 'useNavidate( ) - DateDetail',
    description: '사랑의 순간 상세정보',
    images: '/navidate-logo_blue.png',
  },
};

export type PageProps = {
  params: { postId: string };
};

const DateDetailPage = ({ params }: PageProps) => {
  return <DateDetail params={params} />;
};

export default DateDetailPage;
