import { BASE_URL } from '@/constants/url.constants';

export const fetchPost = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchImages = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/postImages?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const fetchTags = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/postTags?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
