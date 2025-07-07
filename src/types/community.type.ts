import { Bookmark, Like } from './like-bookmark.type';
import { Post, PostImage, PostTag } from './post.type';
import { User } from './user.type';

export type SortOption = 'latest' | 'likes' | 'bookmarks';

export type CommunityPost = Omit<Post, 'createdAt' | 'deletedAt'> & {
  createdAt: Date;
  deletedAt: Date | null;
  author?: User;
  partner?: User;
  tags: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes: Like[]; // 현재 사용자의 좋아요 상태 확인을 위해 추가
  bookmarks: Bookmark[]; // 현재 사용자의 북마크 상태 확인을 위해 추가
};

export type StatusType = 'loading' | 'no-posts' | 'no-search-results';
