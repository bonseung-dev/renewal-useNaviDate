import { BASE_URL } from '@/constants/url.constants';
import { fetchWithAuth } from '@/lib/utils/api';
import { Post, PostImage, PostTag } from '@use-navi-date/shared';

// 포스트 게시
export const createPost = async (newPost: Post) => {
  await fetchWithAuth(`${BASE_URL}/api/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
  });
};

// 이미지 업로드
export const createImage = async (newImage: PostImage) => {
  await fetchWithAuth(`${BASE_URL}/api/images`, {
    method: 'POST',
    body: JSON.stringify(newImage),
  });
};

// 태그 입력
export const createTag = async (newTag: PostTag) => {
  await fetchWithAuth(`${BASE_URL}/postTags`, {
    method: 'POST',
    body: JSON.stringify(newTag),
  });
};
