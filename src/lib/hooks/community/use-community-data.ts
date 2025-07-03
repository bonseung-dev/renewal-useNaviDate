import {
  useGetAllBookmarksQuery,
  useGetAllLikesQuery,
  useGetAllPostImagesQuery,
  useGetAllPostsQuery,
  useGetAllPostTagsQuery,
  useGetAllUsersQuery,
} from '@/lib/queries/community.queries';

export const useCommunityData = (debouncedQuery: string) => {
  const { data: posts = [], isLoading: isPostsLoading } =
    useGetAllPostsQuery(debouncedQuery);
  const { data: users = [], isLoading: isUsersLoading } = useGetAllUsersQuery();
  const { data: tags = [], isLoading: isTagsLoading } =
    useGetAllPostTagsQuery();
  const { data: images = [], isLoading: isImagesLoading } =
    useGetAllPostImagesQuery();
  const { data: likes = [], isLoading: isLikesLoading } = useGetAllLikesQuery();
  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useGetAllBookmarksQuery();

  const isLoading =
    isPostsLoading ||
    isUsersLoading ||
    isTagsLoading ||
    isImagesLoading ||
    isLikesLoading ||
    isBookmarksLoading;

  return {
    posts,
    users,
    tags,
    images,
    likes,
    bookmarks,
    isLoading,
  };
};
