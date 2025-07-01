export type SortOption = 'latest' | 'likes' | 'bookmarks';

export type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
  tempToken?: string;
};

export type Couple = {
  id: string;
  userAId: string;
  userBId: string;
  anniversary: string;
  name: string;
  status: 'pending' | 'confirm' | 'delete';
  createdAt: string;
};

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';
  createdAt: string;
  deletedAt: string | null;
};

export type PostTag = {
  id: string;
  postId: string;
  name: string;
};

export type PostImage = {
  id: string;
  postId: string;
  imageUrl: string;
  address: string | null;
  isRepresentative: boolean;
};

export type Like = {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
};

export type Bookmark = {
  id: string;
  postId: string;
  userId: string;
  createdAt: string;
};

export type EnhancedPost = Omit<Post, 'createdAt' | 'deletedAt'> & {
  createdAt: Date;
  deletedAt: Date | null;
  author?: User;
  partner?: User;
  couple?: Couple;
  tags: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes: Like[]; // 현재 사용자의 좋아요 상태 확인을 위해 추가
  bookmarks: Bookmark[]; // 현재 사용자의 북마크 상태 확인을 위해 추가
};
