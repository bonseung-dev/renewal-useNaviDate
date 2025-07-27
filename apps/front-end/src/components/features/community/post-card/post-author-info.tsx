import { formatDate } from '@/lib/utils/coomunity.utils';
import { CommunityPost } from '@/types/post.type';
import Image from 'next/image';

type PostAuthorInfoProps = {
  author: CommunityPost['author'];
  createdAt: Date;
};

const PostAuthorInfo = ({ author, createdAt }: PostAuthorInfoProps) => {
  const profileUrl = author?.profileImage?.url || '/placeholder-image.png';

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
          dateTime={createdAt.toISOString()}
        >
          {formatDate(createdAt)}
        </time>
      </div>
    </div>
  );
};

export default PostAuthorInfo;
