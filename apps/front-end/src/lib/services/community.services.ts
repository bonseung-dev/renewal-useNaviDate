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
export const getAllPosts = async (
  query = '',
): Promise<(Post & { images: PostImage[]; imageUrl: string | null })[]> => {
  const url = new URL(`${BASE_URL}/posts`);
  //예전 로직 남겨두지만 제대로 작동하진 않음
  url.searchParams.append('visibility', 'public');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('포스트 가져오기 실패');

  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('포스트 가져오기 실패');
  }

  //공개된 포스트만 필터링
  const posts: Post[] = json.data.filter(
    (post: Post) => post.visibility === 'public',
  );

  // 포스트별 이미지 조회(일단 임시로 만들었지만 제대로 작동하진 않음-Unauthorized-인증하지 않더라도 이미지를 가져올 수 있어야함)
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      try {
        const imagesRes = await fetch(
          `${BASE_URL}/post-images/post/${post.id}`,
        );
        const postImages: PostImage[] = await imagesRes.json();
        const representative = postImages.find((img) => img.isRepresentative);

        return {
          ...post,
          tags: [],
          images: postImages,
          imageUrl: representative?.imageUrl || null,
        };
      } catch {
        return { ...post, tags: [], images: [], imageUrl: null };
      }
    }),
  );

  if (!query) return postsWithImages;

  return postsWithImages.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase()),
  );
};
// 사용자 조회
export const getAllUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('사용자를 가져오는데 실패했습니다.');

  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('사용자 데이터 형식이 올바르지 않습니다.');
  }

  return json.data;
};

// 포스트 태그 조회
export const getAllPostTags = async (): Promise<PostTag[]> => {
  try {
    const res = await fetch(`${BASE_URL}/postTags`);
    if (!res.ok) throw new Error('태그를 가져오는데 실패했습니다.');
    const tags: PostTag[] = await res.json();
    return tags;
  } catch {
    return [];
  }
};

// 포스트 이미지 조회
export const getAllPostImages = async (): Promise<PostImage[]> => {
  try {
    const res = await fetch(`${BASE_URL}/postImages`);
    if (!res.ok) throw new Error('이미지를 가져오는데 실패했습니다.');
    return res.json();
  } catch {
    return [];
  }
};

// 좋아요 조회
export const getAllLikes = async (): Promise<Like[]> => {
  const res = await fetch(`${BASE_URL}/likes`);
  if (!res.ok) throw new Error('좋아요를 가져오는데 실패했습니다.');

  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('좋아요 데이터 형식이 올바르지 않습니다.');
  }

  return json.data;
};

// 북마크 조회
export const getAllBookmarks = async (): Promise<Bookmark[]> => {
  const res = await fetch(`${BASE_URL}/bookmarks`);
  if (!res.ok) throw new Error('북마크를 가져오는데 실패했습니다.');

  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('북마크 데이터 형식이 올바르지 않습니다.');
  }

  return json.data;
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
