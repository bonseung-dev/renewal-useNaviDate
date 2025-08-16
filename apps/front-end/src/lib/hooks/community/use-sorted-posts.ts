import { useMemo } from 'react';
import { sortPosts } from '@/lib/utils/coomunity.utils';
import { SortOption } from '@/constants/community.constants';
import { CommunityPost } from '@use-navi-date/shared';

export const useSortedPosts = (
  posts: CommunityPost[],
  sortOption: SortOption,
) => {
  return useMemo(() => sortPosts(posts, sortOption), [posts, sortOption]);
};
