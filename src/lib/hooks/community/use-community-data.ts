import {
  useBookmarksQuery,
  useLikesQuery,
  usePostImagesQuery,
  usePostsQuery,
  usePostTagsQuery,
  useUsersQuery,
} from '@/lib/queries/community.queries';

export const useCommunityData = (debouncedQuery: string) => {
  const { data: posts = [], isLoading: isPostsLoading } =
    usePostsQuery(debouncedQuery);
  const { data: users = [], isLoading: isUsersLoading } = useUsersQuery();
  const { data: tags = [], isLoading: isTagsLoading } = usePostTagsQuery();
  const { data: images = [], isLoading: isImagesLoading } =
    usePostImagesQuery();
  const { data: likes = [], isLoading: isLikesLoading } = useLikesQuery();
  const { data: bookmarks = [], isLoading: isBookmarksLoading } =
    useBookmarksQuery();

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
