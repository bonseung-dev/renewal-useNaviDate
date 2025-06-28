// 정렬 옵션 타입
export type SortOption = 'latest' | 'likes' | 'bookmarks';

// 확장된 포스트 타입
export type EnhancedPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';
  createdAt: Date;
  deletedAt: Date | null;
  author?: {
    id: string;
    email: string;
    password: string;
    nickname: string;
    profileImage: string;
    createdAt: Date;
    tempToken?: string;
  };
  partner?: {
    id: string;
    email: string;
    password: string;
    nickname: string;
    profileImage: string;
    createdAt: Date;
    tempToken?: string;
  };
  tags: {
    id: string;
    postId: string;
    name: string;
  }[];
  images: {
    id: string;
    postId: string;
    imageUrl: string;
    address: string | null;
    isRepresentative: boolean; // 대표 이미지 여부
  }[]; // 최소 한 개의 이미지가 존재
  likesCount: number;
  bookmarksCount: number;
};
