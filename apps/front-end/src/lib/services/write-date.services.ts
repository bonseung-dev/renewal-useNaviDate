import { BASE_URL } from '@/constants/url.constants';
import { Post, PostImage, PostTag } from '@/types/post.type';

// 포스트 게시
export const createPost = async (newPost: Post) => {
  await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
};

// 이미지 업로드
export const createImage = async (newImage: PostImage) => {
  await fetch(`${BASE_URL}/postImages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newImage),
  });
};

// 태그 입력
export const createTag = async (newTag: PostTag) => {
  await fetch(`${BASE_URL}/postTags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTag),
  });
};
