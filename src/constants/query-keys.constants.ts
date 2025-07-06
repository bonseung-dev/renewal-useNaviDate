export const QUERY_KEYS = {
  POSTS: 'community-posts',
  POSTS_SEARCH: (query: string) => ['community-posts', 'search', query],
  USERS: 'community-users',
  COUPLES: 'community-couples',
  TAGS: 'community-post-tags',
  IMAGES: 'community-post-images',
  LIKES: 'community-likes',
  BOOKMARKS: 'community-bookmarks',
  WRITE_POSTS: 'write-posts',
  WRITE_IMAGES: 'write-post-images',
  WRITE_TAGS: 'write-post-tags',
} as const;

// 쿼리 키 타입 추출 (필요시 사용)
export type CommunityQueryKeys = keyof typeof QUERY_KEYS;
