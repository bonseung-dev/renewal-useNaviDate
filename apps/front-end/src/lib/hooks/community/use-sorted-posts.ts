import { useMemo } from 'react';
import { sortPosts } from '@/lib/utils/coomunity.utils';
import { CommunityPost } from '@/types/post.type';
import { SortOption } from '@/constants/community.constants';

export const useSortedPosts = (
  posts: CommunityPost[],
  sortOption: SortOption,
) => {
  return useMemo(() => sortPosts(posts, sortOption), [posts, sortOption]);
};
