import {
  useBookmarksQuery,
  useCouplesQuery,
  useLikesQuery,
  usePostImagesQuery,
  usePostsQuery,
  usePostTagsQuery,
  useUsersQuery,
} from '@/lib/queries/community.queries';

export const useCommunityData = (debouncedQuery: string = '') => {
  const postsQuery = usePostsQuery(debouncedQuery);
  const usersQuery = useUsersQuery();
  const couplesQuery = useCouplesQuery();
  const tagsQuery = usePostTagsQuery();
  const imagesQuery = usePostImagesQuery();
  const likesQuery = useLikesQuery();
  const bookmarksQuery = useBookmarksQuery();

  return {
    posts: postsQuery.data,
    isLoading: postsQuery.isLoading,
    users: usersQuery.data,
    couples: couplesQuery.data,
    tags: tagsQuery.data,
    images: imagesQuery.data,
    likes: likesQuery.data,
    bookmarks: bookmarksQuery.data,
  };
};
