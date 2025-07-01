import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

// 북마크 뮤테이션 훅
export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      toggleBookmark(postId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });
};
