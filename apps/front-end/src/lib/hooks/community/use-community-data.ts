import {
  useGetAllBookmarksQuery,
  useGetAllLikesQuery,
  useGetAllPostsQuery,
  useGetAllUsersQuery,
} from '@/lib/queries/community.queries';

export const useCommunityData = (debouncedQuery: string) => {
  // posts에는 이미 tags=[], images=[] 포함
  const { data: posts = [], isLoading: isPostsLoading } =
    useGetAllPostsQuery(debouncedQuery);

  console.log('posts:', posts);

  const { data: users = [], isLoading: isUsersLoading } = useGetAllUsersQuery();
  const { data: likes = [], isLoading: isLikesLoading } = useGetAllLikesQuery();
  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useGetAllBookmarksQuery();

  const isLoading =
    isPostsLoading || isUsersLoading || isLikesLoading || isBookmarksLoading;

  return {
    posts,
    users,
    tags: [],
    images: [],
    likes,
    bookmarks,
    isLoading,
  };
};
