import { EnhancedPost, SortOption } from '@/types/community.type';
import { debounce } from 'lodash';

// 정렬 함수
export const sortPosts = (
  posts: EnhancedPost[],
  sortOption: SortOption,
): EnhancedPost[] => {
  return [...posts].sort((a, b) => {
    if (sortOption === 'latest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortOption === 'likes') {
      return b.likesCount - a.likesCount;
    } else if (sortOption === 'bookmarks') {
      return b.bookmarksCount - a.bookmarksCount;
    }
    return 0;
  });
};

// 디바운스 유틸리티
export const createDebouncedSearch = (
  delay: number,
  callback: (query: string) => void,
) => {
  return debounce(callback, delay);
};
