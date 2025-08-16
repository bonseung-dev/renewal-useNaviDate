import { BASE_URL } from '@/constants/url.constants';
import {
  Bookmark,
  Like,
  Post,
  PostImage,
  PostTag,
  User,
} from '@use-navi-date/shared';

// 본 파일은 테스트 기간 동안 개발 및 수정 용이성을 위해 커뮤니티 관련 api 들을 임시로 모아둔 파일입니다.
// 백엔드 db와 제대로 연결이 되면 분리할 예정입니다.

// 포스트 조회
export const getAllPosts = async (query = ''): Promise<Post[]> => {
  const url = new URL(`${BASE_URL}/posts`);
  url.searchParams.append('visibility', 'public');

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error('포스트 가져오기 실패');

  const posts: unknown = await response.json();

  // 타입 안정성을 위한 함수
  const isPostArray = (
    data: unknown,
  ): data is Array<Post & { tags?: PostTag[] }> => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          'id' in item &&
          'title' in item,
      )
    );
  };

  if (!isPostArray(posts)) {
    throw new Error('Invalid posts data format');
  }

  if (!query) return posts;

  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(query.toLowerCase());

    // 태그 검사
    const tagMatch =
      Array.isArray(post.tags) &&
      post.tags.some(
        (tag: unknown) =>
          typeof tag === 'object' &&
          tag !== null &&
          'name' in tag &&
          typeof tag.name === 'string' &&
          tag.name.toLowerCase().includes(query.toLowerCase()),
      );

    return titleMatch || tagMatch;
  });
};

// 사용자 조회
export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) throw new Error('사용자를 가져오는데 실패했습니다.');
  return response.json();
};

// 포스트 태그 조회
export const getAllPostTags = async (): Promise<PostTag[]> => {
  const response = await fetch(`${BASE_URL}/postTags`);
  if (!response.ok) throw new Error('태그를 가져오는데 실패했습니다.');
  return response.json();
};

// 포스트 이미지 조회
export const getAllPostImages = async (): Promise<PostImage[]> => {
  const response = await fetch(`${BASE_URL}/postImages`);
  if (!response.ok) throw new Error('이미지를 가져오는데 실패했습니다.');
  return response.json();
};

// 좋아요 조회
export const getAllLikes = async (): Promise<Like[]> => {
  const response = await fetch(`${BASE_URL}/likes`);
  if (!response.ok) throw new Error('좋아요를 가져오는데 실패했습니다.');
  return response.json();
};

// 북마크 조회
export const getAllBookmarks = async (): Promise<Bookmark[]> => {
  const response = await fetch(`${BASE_URL}/bookmarks`);
  if (!response.ok) throw new Error('북마크를 가져오는데 실패했습니다.');
  return response.json();
};

// 좋아요 추가/삭제 함수
export const updateLike = async (
  postId: number,
  userId: number,
): Promise<Like | { message: string }> => {
  // 먼저 기존 좋아요 여부 확인
  const checkResponse = await fetch(
    `${BASE_URL}/likes?postId=${postId}&userId=${userId}`,
  );
  const existingLikes = await checkResponse.json();

  // 이미 좋아요가 있으면 삭제
  if (existingLikes.length > 0) {
    const deleteResponse = await fetch(
      `${BASE_URL}/likes/${existingLikes[0].id}`,
      {
        method: 'DELETE',
      },
    );
    if (!deleteResponse.ok) throw new Error('좋아요 취소 실패');
    return { message: '좋아요 취소 성공' };
  }

  // 없으면 추가
  const createResponse = await fetch(`${BASE_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, userId }),
  });
  if (!createResponse.ok) throw new Error('좋아요 추가 실패');
  return createResponse.json();
};

// 북마크 추가/삭제 함수
export const updateBookmark = async (
  postId: number,
  userId: number,
): Promise<Bookmark | { message: string }> => {
  // 먼저 기존 북마크 여부 확인
  const checkResponse = await fetch(
    `${BASE_URL}/bookmarks?postId=${postId}&userId=${userId}`,
  );
  const existingBookmarks = await checkResponse.json();

  // 이미 북마크가 있으면 삭제
  if (existingBookmarks.length > 0) {
    const deleteResponse = await fetch(
      `${BASE_URL}/bookmarks/${existingBookmarks[0].id}`,
      {
        method: 'DELETE',
      },
    );
    if (!deleteResponse.ok) throw new Error('북마크 취소 실패');
    return { message: '북마크 취소 성공' };
  }

  // 없으면 추가
  const createResponse = await fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ postId, userId }),
  });
  if (!createResponse.ok) throw new Error('북마크 추가 실패');
  return createResponse.json();
};
