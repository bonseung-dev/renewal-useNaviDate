import { useCommunityData } from '@/lib/hooks/community/use-community-data';
import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import CommunityStatus from '../community/community-status';
import PostList from '../community/post-list';

type MyBookmarksTabProps = {
  userId: number;
};

const MyBookmarksTab = ({ userId }: MyBookmarksTabProps) => {
  const { posts, users, likes, bookmarks, isLoading } = useCommunityData('');

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

  const bookmarkedCommunityPosts = useCommunityPosts(
    bookmarkedPostsWithUndefinedImageUrl,
    users,
    likes,
    bookmarks,
  );

  if (isLoading) return <CommunityStatus type="loading" />;

  return bookmarkedCommunityPosts.length > 0 ? (
    <PostList posts={bookmarkedCommunityPosts} searchQuery="" userId={userId} />
  ) : (
    <CommunityStatus type="no-posts" />
  );
};

export default MyBookmarksTab;
