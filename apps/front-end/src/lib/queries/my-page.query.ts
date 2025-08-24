import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '../services/my-page.services';

export const useGetMyPostsQuery = (userId: number, token: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, 'my', userId],
    queryFn: () => getMyPosts(userId, token),
    enabled: !!userId,
  });
};
