import { BASE_URL } from '@/constants/url.constants';
import { Post } from '@/types/post.type';

export const fetchPost = async (postId: Post['id']) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchImages = async (postId: Post['id']) => {
  const response = await fetch(`${BASE_URL}/postImages?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTags = async (postId: Post['id']) => {
  const response = await fetch(`${BASE_URL}/postTags?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
