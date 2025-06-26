'use client';

import Image from 'next/image';
import { Bookmark, Heart } from 'lucide-react';
import { EnhancedPost } from '@/types/community.type';
import { useState } from 'react';

const PostCard = ({ post }: { post: EnhancedPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showLikesCount, setShowLikesCount] = useState(false);
  const [showBookmarksCount, setShowBookmarksCount] = useState(false);

  return (
    <div className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-shadow1">
      <div className="absolute inset-0">
        {/* 대표 이미지 렌더링 */}
        {post.images.length > 0 ? (
          (() => {
            const representativeImage = post.images.find(
              (image) => image.isRepresentative,
            );
            const displayImage = representativeImage || post.images[0];
            return (
              <>
                <Image
                  src={displayImage.imageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </>
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
              <div className="text-l-title4 font-light text-skin5">
                {new Date(post.date)
                  .toISOString()
                  .split('T')[0]
                  .replace(/-/g, '-')}
              </div>
            </div>
          </div>
          {/* 하트 & 북마크 버튼 그룹 */}
          <div className="flex gap-1">
            {/* 하트 버튼 */}
            <div className="relative group">
              <button
                className="w-[25px] h-[25px] flex items-center justify-center transition-all duration-200"
                onClick={() => setIsLiked(!isLiked)}
                onMouseEnter={() => setShowLikesCount(true)}
                onMouseLeave={() => setShowLikesCount(false)}
              >
                <Heart
                  className={`w-[25px] h-[25px] transition-all duration-200 ${
                    isLiked
                      ? 'fill-white stroke-white'
                      : 'stroke-white fill-none group-hover:fill-white/50'
                  }`}
                />
              </button>
              {showLikesCount && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-skin1/60 text-skin5 text-l-title5 font-light px-2 py-1 rounded whitespace-nowrap">
                  {post.likesCount} likes
                </div>
              )}
            </div>

            {/* 북마크 버튼 */}
            <div className="relative group">
              <button
                className="w-[25px] h-[25px] flex items-center justify-center transition-all duration-200"
                onClick={() => setIsBookmarked(!isBookmarked)}
                onMouseEnter={() => setShowBookmarksCount(true)}
                onMouseLeave={() => setShowBookmarksCount(false)}
              >
                <Bookmark
                  className={`w-[25px] h-[25px] transition-all duration-200 ${
                    isBookmarked
                      ? 'fill-white stroke-white'
                      : 'stroke-white fill-none group-hover:fill-white/50'
                  }`}
                />
              </button>
              {showBookmarksCount && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-skin1/60 text-skin5 text-l-title5 font-light px-2 py-1 rounded whitespace-nowrap">
                  {post.bookmarksCount || 0}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
