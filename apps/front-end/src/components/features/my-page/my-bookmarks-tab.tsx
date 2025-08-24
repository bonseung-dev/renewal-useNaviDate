import { usePostsData } from '@/lib/hooks/community/use-community-data';
import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import CommunityStatus from '../community/community-status';
import PostList from '../community/post-list';
import { useSortedPosts } from '@/lib/hooks/community/use-sorted-posts';
import { SORT_OPTIONS } from '@use-navi-date/shared';

type MyBookmarksTabProps = {
  userId: number;
  token?: string;
};

const MyBookmarksTab = ({ userId, token }: MyBookmarksTabProps) => {
  const { posts, users, likes, bookmarks, isLoading } = usePostsData('', token);

  // 내 북마크만 필터링
  const myBookmarkPostIds = bookmarks
    .filter((bookmark) => bookmark.userId === userId)
    .map((b) => b.postId);

  const bookmarkedPosts = posts.filter((post) =>
    myBookmarkPostIds.includes(post.id),
  );

  // imageUrl이 null인 경우 undefined로 변환
  const bookmarkedPostsWithUndefinedImageUrl = bookmarkedPosts.map((post) => ({
    ...post,
    imageUrl: post.imageUrl === null ? undefined : post.imageUrl,
  }));

  const bookmarkedPostsByUser = useCommunityPosts(
    bookmarkedPostsWithUndefinedImageUrl,
    users,
    likes,
    bookmarks,
  );
  const sortedPosts = useSortedPosts(
    bookmarkedPostsByUser,
    SORT_OPTIONS.LATEST,
  );

  if (isLoading) return <CommunityStatus type="loading" />;

  return sortedPosts.length > 0 ? (
    <PostList
      posts={sortedPosts}
      searchQuery=""
      userId={userId}
      token={token}
    />
  ) : (
    <CommunityStatus type="no-posts" />
  );
};

export default MyBookmarksTab;
