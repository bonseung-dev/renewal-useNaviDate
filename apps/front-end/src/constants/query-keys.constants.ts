export const QUERY_KEYS = {
  POSTS: 'community-posts',
  POSTS_SEARCH: (query: string) => ['community-posts', 'search', query],
  USERS: 'community-users',
  COUPLES: 'community-couples',
  TAGS: 'community-post-tags',
  IMAGES: 'community-post-images',
  LIKES: 'community-likes',
  BOOKMARKS: 'community-bookmarks',
  WRITE_POSTS: 'posts',
  WRITE_IMAGES: 'images',
  WRITE_TAGS: 'tags',
  ANNIVERSARIES: 'anniversaries',
  ANNIVERSARIES_BY_COUPLE: (coupleId: number) => ['anniversaries', coupleId],
} as const;

// 쿼리 키 타입 추출 (필요시 사용)
export type CommunityQueryKeys = keyof typeof QUERY_KEYS;
