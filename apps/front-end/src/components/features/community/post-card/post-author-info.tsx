import { formatDate } from '@/lib/utils/coomunity.utils';
import { CommunityPost } from '@use-navi-date/shared';
import Image from 'next/image';

type PostAuthorInfoProps = {
  author: CommunityPost['author'];
  date: Date | string;
};

const PostAuthorInfo = ({ author, date }: PostAuthorInfoProps) => {
  const profileUrl =
    typeof author?.profileImage === 'string'
      ? author.profileImage
      : '/placeholder-image.png';

  return (
    <div className="flex items-center">
      <figure className="w-9 h-9 rounded-full overflow-hidden relative">
        <Image
          src={profileUrl}
          alt={`${author?.nickname || '작성자'}의 프로필 사진`}
          width={36}
          height={36}
          className="object-cover w-full h-full"
          sizes="36px"
        />
      </figure>
      <div className="ml-2">
        <p className="text-b-h4 font-bold text-skin5">
          {author?.nickname || 'Unknown User'}
        </p>
        <time
          className="text-l-title4 font-light text-skin5"
          dateTime={
            typeof date === 'string'
              ? new Date(date).toISOString()
              : date.toISOString()
          }
        >
          {formatDate(typeof date === 'string' ? new Date(date) : date)}
        </time>
      </div>
    </div>
  );
};

export default PostAuthorInfo;
