import { QUERY_KEYS } from '@/constants/query-keys.constants';
import {
  fetchImages,
  fetchPost,
  fetchTags,
} from '../services/date-detail.services';
import { useQuery } from '@tanstack/react-query';
import { Post, PostImage, PostTag } from '@use-navi-date/shared';

export const usePostByPostIdQuery = (postId: Post['id']) => {
  return useQuery<Post>({
    queryKey: [QUERY_KEYS.WRITE_POSTS, postId],
    queryFn: () => fetchPost(postId),
  });
};

export const usePostImagesByPostIdQuery = (postId: Post['id']) => {
  return useQuery<PostImage[]>({
    queryKey: [QUERY_KEYS.WRITE_IMAGES, postId],
    queryFn: () => fetchImages(postId),
  });
};

export const usePostTagsByPostIdQuery = (postId: Post['id']) => {
  return useQuery<PostTag[]>({
    queryKey: [QUERY_KEYS.WRITE_TAGS, postId],
    queryFn: () => fetchTags(postId),
  });
};
