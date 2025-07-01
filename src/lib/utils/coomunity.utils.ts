import { SORT_OPTIONS } from '@/constants/community.constants';
import { EnhancedPost, SortOption } from '@/types/community.type';
import { debounce } from 'lodash';

// 정렬 함수
export const sortPosts = (
  posts: EnhancedPost[],
  sortOption: SortOption,
): EnhancedPost[] => {
  return [...posts].sort((a, b) => {
    if (sortOption === SORT_OPTIONS.LATEST) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortOption === SORT_OPTIONS.LIKES) {
      return b.likesCount - a.likesCount;
    } else if (sortOption === SORT_OPTIONS.BOOKMARKS) {
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

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};
