import { useCommunityData } from '@/lib/hooks/community/use-community-data';
import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import PostList from '../community/post-list';
import CommunityStatus from '../community/community-status';

type MyPostTabProps = {
  userId: number;
};

const MyPostTab = ({ userId }: MyPostTabProps) => {
  const { posts, users, likes, bookmarks, isLoading } = useCommunityData('');

  // 내가 작성한 포스트만 필터링
  const myPosts = posts.filter((post) => post.userId === userId);
  // imageUrl이 null인 경우 undefined로 변환
  const myPostsWithUndefinedImageUrl = myPosts.map((post) => ({
    ...post,
    imageUrl: post.imageUrl === null ? undefined : post.imageUrl,
  }));
  const myCommunityPosts = useCommunityPosts(
    myPostsWithUndefinedImageUrl,
    users,
    likes,
    bookmarks,
  );

  if (isLoading) return <CommunityStatus type="loading" />;

  return myCommunityPosts.length > 0 ? (
    <PostList posts={myCommunityPosts} searchQuery="" userId={userId} />
  ) : (
    <CommunityStatus type="no-posts" />
  );
};

export default MyPostTab;
