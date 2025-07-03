export const SORT_OPTIONS = {
  LATEST: 'latest',
  LIKES: 'likes',
  BOOKMARKS: 'bookmarks',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const ERROR_MESSAGES = {
  POSTS: '포스트를 가져오는데 실패했습니다.',
  USERS: '사용자를 가져오는데 실패했습니다.',
  COUPLES: '커플을 가져오는데 실패했습니다.',
  TAGS: '태그를 가져오는데 실패했습니다.',
  IMAGES: '이미지를 가져오는데 실패했습니다.',
  LIKES: '좋아요를 가져오는데 실패했습니다.',
  BOOKMARKS: '북마크를 가져오는데 실패했습니다.',
};

export const SEARCH_DEBOUNCE_DELAY = 400;
