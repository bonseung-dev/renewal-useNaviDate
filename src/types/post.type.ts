export type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
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

//Calendar용 post + 이미지
export type CalendarPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
  createdAt: string;
  deletedAt: string | null;
  images: PostImage[];
};
