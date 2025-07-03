import Image from 'next/image';
import { Bookmark, Heart } from 'lucide-react';
import { CommunityPost } from '@/types/community.type';
import { useState } from 'react';
import { formatDate } from '@/lib/utils/coomunity.utils';
import Tooltip from '@/components/ui/tooltip';
import { useUpdateLikeMutation } from '@/lib/mutations/like.mutation';
import { useUpdateBookmarkMutation } from '@/lib/mutations/bookmark.mutation';

type PostCardProps = {
  post: CommunityPost;
};

const PostCard = ({ post }: PostCardProps) => {
  const [showLikesCount, setShowLikesCount] = useState(false);
  const [showBookmarksCount, setShowBookmarksCount] = useState(false);

  const { mutate: toggleLike } = useUpdateLikeMutation();
  const { mutate: toggleBookmark } = useUpdateBookmarkMutation();

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  // 현재 사용자의 좋아요 및 북마크 상태 확인
  const isLiked = post.likes.some((like) => like.userId === userId);
  const isBookmarked = post.bookmarks.some(
    (bookmark) => bookmark.userId === userId,
  );

  const handleLike = () => {
    if (!userId) return;
    toggleLike({ postId: post.id, userId });
  };

  const handleBookmark = () => {
    if (!userId) return;
    toggleBookmark({ postId: post.id, userId });
  };

  return (
    <article
      className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-shadow1"
      aria-labelledby={`post-${post.id}-title`}
    >
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
                  alt={`"${post.title}" 포스트의 대표 이미지`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div
                  className="absolute inset-0 bg-black/30"
                  aria-hidden="true"
                ></div>
              </>
            );
          })()
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-skin4"
            aria-hidden="true"
          >
            <span className="text-font4">이미지가 없습니다</span>
          </div>
        )}

        {/* 제목 및 태그 */}
        <header className="absolute top-[22px] left-0 w-full text-center px-2">
          <h3
            id={`post-${post.id}-title`}
            className="text-skin5 text-m-h1 line-clamp-1"
          >
            {post.title}
          </h3>
          <div className="mt-1 text-skin5 text-m-h4">
            {post.tags.map((tag) => (
              <span key={tag.id}>#{tag.name} </span>
            ))}
          </div>
        </header>

        {/* 하단 정보 */}
        <footer className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
          <div className="flex items-center">
            <figure className="w-9 h-9 rounded-full overflow-hidden relative">
              <Image
                src={post.author?.profileImage || '/placeholder-image.png'}
                alt={`${post.author?.nickname || '작성자'}의 프로필 사진`}
                width={36}
                height={36}
                className="object-cover w-full h-full"
                sizes="36px"
              />
            </figure>
            <div className="ml-2">
              <p className="text-b-h4 font-bold text-skin5">
                {post.author?.nickname || 'Unknown User'}
              </p>
              <time
                className="text-l-title4 font-light text-skin5"
                dateTime={post.createdAt.toISOString()}
              >
                {formatDate(post.createdAt)}
              </time>
            </div>
          </div>

          {/* 상호작용 버튼 그룹 */}
          <nav aria-label="포스트 액션">
            <div className="flex gap-1">
              {/* 좋아요 버튼 */}
              <Tooltip content={post.likesCount} show={showLikesCount}>
                <button
                  aria-label={`좋아요 ${isLiked ? '취소' : ''} (현재 ${post.likesCount}개)`}
                  className="w-[25px] h-[25px] flex items-center justify-center transition-all duration-200"
                  onClick={handleLike}
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
              </Tooltip>

              {/* 북마크 버튼 */}
              <Tooltip content={post.bookmarksCount} show={showBookmarksCount}>
                <button
                  aria-label={`북마크 ${isBookmarked ? '취소' : ''} (현재 ${post.bookmarksCount}개)`}
                  className="w-[25px] h-[25px] flex items-center justify-center transition-all duration-200"
                  onClick={handleBookmark}
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
              </Tooltip>
            </div>
          </nav>
        </footer>
      </div>
    </article>
  );
};

export default PostCard;
