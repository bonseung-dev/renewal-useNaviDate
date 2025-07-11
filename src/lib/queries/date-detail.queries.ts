import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { Post, PostImage, PostTag } from '@/types/post.type';
import {
  fetchImages,
  fetchPost,
  fetchTags,
} from '../services/date-detail.services';
import { useQuery } from '@tanstack/react-query';

export const usePostByPostIdQuery = (postId: string) => {
  return useQuery<Post>({
    queryKey: [QUERY_KEYS.WRITE_POSTS, postId],
    queryFn: () => fetchPost(postId),
  });
};

export const usePostImagesByPostIdQuery = (postId: string) => {
  return useQuery<PostImage[]>({
    queryKey: [QUERY_KEYS.WRITE_IMAGES, postId],
    queryFn: () => fetchImages(postId),
  });
};

export const usePostTagsByPostIdQuery = (postId: string) => {
  return useQuery<PostTag[]>({
    queryKey: [QUERY_KEYS.WRITE_TAGS, postId],
    queryFn: () => fetchTags(postId),
  });
};
