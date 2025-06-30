import { BASE_URL } from '@/constants/url.constants';
import {
  Post,
  User,
  Couple,
  PostTag,
  PostImage,
  Like,
  Bookmark,
  EnhancedPost,
} from '@/types/community.type';

// 포스트 조회
export const fetchPosts = async (query = ''): Promise<Post[]> => {
  const response = await fetch(
    `${BASE_URL}/posts?visibility=public${query ? `&q=${encodeURIComponent(query)}` : ''}`,
  );
  if (!response.ok) throw new Error('포스트를 가져오는데 실패했습니다.');
  return response.json();
};

// 사용자 조회
export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('사용자를 가져오는데 실패했습니다.');
  return response.json();
};

// 커플 조회
export const fetchCouples = async (): Promise<Couple[]> => {
  const response = await fetch(`${BASE_URL}/couples`);
  if (!response.ok) throw new Error('커플을 가져오는데 실패했습니다.');
  return response.json();
};

// 포스트 태그 조회
export const fetchPostTags = async (): Promise<PostTag[]> => {
  const response = await fetch(`${BASE_URL}/postTags`);
  if (!response.ok) throw new Error('태그를 가져오는데 실패했습니다.');
  return response.json();
};

// 포스트 이미지 조회
export const fetchPostImages = async (): Promise<PostImage[]> => {
  const response = await fetch(`${BASE_URL}/postImages`);
  if (!response.ok) throw new Error('이미지를 가져오는데 실패했습니다.');
  return response.json();
};

// 좋아요 조회
export const fetchLikes = async (): Promise<Like[]> => {
  const response = await fetch(`${BASE_URL}/likes`);
  if (!response.ok) throw new Error('좋아요를 가져오는데 실패했습니다.');
  return response.json();
};

// 북마크 조회
export const fetchBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks`);
  if (!response.ok) throw new Error('북마크를 가져오는데 실패했습니다.');
  return response.json();
};

// EnhancedPost 생성 함수
export const createEnhancedPosts = (
  posts: Post[],
  users: User[],
  couples: Couple[],
  postTags: PostTag[],
  postImages: PostImage[],
  likes: Like[],
  bookmarks: Bookmark[],
): EnhancedPost[] => {
  return posts.map((post) => ({
    ...post,
    createdAt: new Date(post.createdAt),
    deletedAt: post.deletedAt ? new Date(post.deletedAt) : null,
    couple: couples.find(
      (c) => c.userAId === post.userId || c.userBId === post.userId,
    ),
    author: users.find((u) => u.id === post.userId),
    partner: couples.find(
      (c) => c.userAId === post.userId || c.userBId === post.userId,
    )
      ? users.find((u) => {
          const couple = couples.find(
            (c) => c.userAId === post.userId || c.userBId === post.userId,
          );
          return (
            u.id ===
            (couple?.userAId === post.userId
              ? couple?.userBId
              : couple?.userAId)
          );
        })
      : undefined,
    tags: postTags.filter((tag) => tag.postId === post.id),
    images: postImages.filter((image) => image.postId === post.id),
    likesCount: likes.filter((like) => like.postId === post.id).length,
    bookmarksCount: bookmarks.filter((bookmark) => bookmark.postId === post.id)
      .length,
  }));
};
