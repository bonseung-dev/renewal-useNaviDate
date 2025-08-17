import { useCommunityData } from '@/lib/hooks/community/use-community-data';
import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import PostList from '../community/post-list';
import CommunityStatus from '../community/community-status';

type MyPostTabProps = {
  userId: number;
};

const MyPostTab = ({ userId }: MyPostTabProps) => {
  // 현재 useCommunityData를 사용해서 전체 포스트를 가져오고 있습니다.
  // 원래는 `/posts/my` 엔드포인트를 통해 내 포스트만 가져오고 싶었으나,
  // posts.controller.ts를 확인해보니 `my` 엔드포인트가 존재하지 않는거 같습니다!
  // 그래서 일단 전체 포스트를 가져온 후, userId로 필터링하여 내 포스트를 가져오고 있습니다!
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
