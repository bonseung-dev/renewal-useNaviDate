import { useMemo } from 'react';
import { sortPosts } from '@/lib/utils/coomunity.utils';
import { EnhancedPost, SortOption } from '@/types/community.type';

export const useSortedPosts = (
  posts: EnhancedPost[],
  sortOption: SortOption,
) => {
  return useMemo(() => sortPosts(posts, sortOption), [posts, sortOption]);
};
