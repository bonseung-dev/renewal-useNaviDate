'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { EnhancedPost } from '@/types/community.type';

const PostCard = ({ post }: { post: EnhancedPost }) => {
  return (
    <div className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-shadow1">
      {/* 대표 이미지 렌더링 */}
      {post.images.length > 0 ? (
        (() => {
          const representativeImage = post.images.find(
            (image) => image.isRepresentative,
          );
          const displayImage = representativeImage || post.images[0];
          return (
            <Image
              src={displayImage.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          );
        })()
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-skin4">
          <span className="text-font4">이미지가 없습니다</span>
        </div>
      )}

      {/* 제목 및 태그 */}
      <div className="absolute top-[22px] left-0 w-full text-center px-2">
        <h3 className="text-skin5 text-m-h1 line-clamp-1">{post.title}</h3>
        <div className="mt-1 text-skin5 text-m-h4">
          {post.tags.map((tag) => (
            <span key={tag.id}>#{tag.name}</span>
          ))}
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden relative">
            <Image
              src={post.author?.profileImage || '/default-profile.jpg'}
              alt={post.author?.id || '작성자 프로필'}
              width={36}
              height={36}
              className="object-cover w-full h-full"
              sizes="36px"
            />
          </div>
          <div className="ml-2">
            <div className="text-b-h4 font-bold text-skin5">
              {post.author?.nickname || 'Unknown User'}
            </div>
            <div className="text-l-title4 text-skin5">
              {new Date(post.date).toLocaleDateString('ko-KR')}
            </div>
          </div>
        </div>

        <button className="w-[72px] h-[32px] rounded-[12px] bg-white/50 text-font3 text-b-h2 font-bold flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 fill-skin7 stroke-none" />
          <span className="text-font3">{post.likesCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
