import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

// 좋아요 토글 뮤테이션 훅
export const useToggleLike = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      toggleLike(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });
};
