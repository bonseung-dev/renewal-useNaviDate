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
  createdAt: Date;
  deletedAt: Date | null;
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
export type CalendarPost = Post & {
  images: PostImage[];
};

// Community용 post + author + tags + images + likes + bookmarks
export type CommunityPost = Post & {
  author?: User;
  tags: PostTag[];
  images: PostImage[];
  likesCount: number;
  bookmarksCount: number;
  likes: Like[];
  bookmarks: Bookmark[];
};
