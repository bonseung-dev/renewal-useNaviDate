import Tooltip from '@/components/ui/tooltip';
import { useUpdateBookmarkMutation } from '@/lib/mutations/bookmark.mutation';
import { useUpdateLikeMutation } from '@/lib/mutations/like.mutation';
import { CommunityPost } from '@/types/community.type';
import { Bookmark, Heart } from 'lucide-react';
import { useState } from 'react';

type PostActionsProps = {
  postId: string;
  likes: CommunityPost['likes'];
  bookmarks: CommunityPost['bookmarks'];
  likesCount: number;
  bookmarksCount: number;
};

const PostActions = ({
  postId,
  likes,
  bookmarks,
  likesCount,
  bookmarksCount,
}: PostActionsProps) => {
  const [showLikesCount, setShowLikesCount] = useState(false);
  const [showBookmarksCount, setShowBookmarksCount] = useState(false);
  const { mutate: toggleLike } = useUpdateLikeMutation();
  const { mutate: toggleBookmark } = useUpdateBookmarkMutation();

  const userId =
    typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const isLiked = likes.some((like) => like.userId === userId);
  const isBookmarked = bookmarks.some((bookmark) => bookmark.userId === userId);

  const handleLike = () => {
    if (!userId) return;
    toggleLike({ postId, userId });
  };

  const handleBookmark = () => {
    if (!userId) return;
    toggleBookmark({ postId, userId });
  };

  return (
    <nav aria-label="포스트 액션">
      <div className="flex gap-1">
        <Tooltip content={likesCount} show={showLikesCount}>
          <button
            aria-label={`좋아요 ${isLiked ? '취소' : ''} (현재 ${likesCount}개)`}
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

        <Tooltip content={bookmarksCount} show={showBookmarksCount}>
          <button
            aria-label={`북마크 ${isBookmarked ? '취소' : ''} (현재 ${bookmarksCount}개)`}
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
  );
};

export default PostActions;
