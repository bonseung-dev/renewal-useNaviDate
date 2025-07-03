import { useMemo } from 'react';
import { sortPosts } from '@/lib/utils/coomunity.utils';
import { CommunityPost, SortOption } from '@/types/community.type';

export const useSortedPosts = (
  posts: CommunityPost[],
  sortOption: SortOption,
) => {
  return useMemo(() => sortPosts(posts, sortOption), [posts, sortOption]);
};
