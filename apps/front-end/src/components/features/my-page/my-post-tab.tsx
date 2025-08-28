import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import PostList from '../community/post-list';
import CommunityStatus from '../community/community-status';
import { useGetMyPostsQuery } from '@/lib/queries/my-page.query';
import { SORT_OPTIONS } from '@use-navi-date/shared';
import { useSortedPosts } from '@/lib/hooks/community/use-sorted-posts';
import { usePostsData } from '@/lib/hooks/community/use-community-data';

type MyPostTabProps = {
  userId: number;
  token: string;
};

const MyPostTab = ({ userId, token }: MyPostTabProps) => {
  const { data: myPosts = [], isLoading: isPostsLoading } = useGetMyPostsQuery(
    userId,
    token,
  );

  const {
    users,
    likes,
    bookmarks,
    isLoading: isCommunityLoading,
  } = usePostsData('', token);

  // 대표 이미지가 null이면 undefined 처리
  const myPostsWithUndefinedImageUrl = myPosts.map((post) => ({
    ...post,
    imageUrl: post.imageUrl === null ? undefined : post.imageUrl,
  }));

  const myPagePosts = useCommunityPosts(
    myPostsWithUndefinedImageUrl,
    users,
    likes,
    bookmarks,
  );

  const sortedPosts = useSortedPosts(myPagePosts, SORT_OPTIONS.LATEST);

  if (isPostsLoading || isCommunityLoading)
    return <CommunityStatus type="loading" />;

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

export default MyPostTab;
