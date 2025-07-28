import { StatusType } from '@/types/community.type';

type CommunityStatusProps = {
  type: StatusType;
};

const CommunityStatus = ({ type }: CommunityStatusProps) => {
  const messages = {
    loading: '로딩 중...',
    'no-posts': '포스트가 없습니다',
    'no-search-results': '검색 결과가 없습니다',
  };

  return (
    <div
      className="text-center py-10 text-skin1 text-b-h2 font-bold"
      role="status"
    >
      {messages[type]}
    </div>
  );
};

export default CommunityStatus;
