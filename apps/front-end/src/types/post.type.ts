import { Image } from './image.type';
import { Bookmark, Like } from './like-bookmark.type';
import { User } from './user.type';

export type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  visibility: boolean; // true: 공개, false: 비공개, default: false
  date: string;
  emotion: Emotion;
  createdAt: string;
  deletedAt: string | null;
};

export type PostTag = {
  id: number;
  postId: number;
  name: string;
};

export type PostImage = {
  id: number;
  postId: number;
  postImage: Image;
  address: string | null;
  isRepresentative: boolean;
};

//Calendar용 post + 이미지
export type CalendarPost = {
  id: number;
  userId: number;
  title: string;
  content: string;
  visibility: boolean;
  date: string;
  emotion: Emotion;
  createdAt: string;
  deletedAt: string | null;
  images: PostImage[];
};

export type CommunityPost = Omit<Post, 'createdAt' | 'deletedAt'> & {
  createdAt: Date;
  deletedAt: Date | null;
  author?: User;
  tags: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes: Like[]; // 현재 사용자의 좋아요 상태 확인을 위해 추가
  bookmarks: Bookmark[]; // 현재 사용자의 북마크 상태 확인을 위해 추가
};
