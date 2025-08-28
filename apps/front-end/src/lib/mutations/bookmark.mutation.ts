import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBookmark } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { CommunityPost } from '@/types/post.type';

// 북마크 업데이트 뮤테이션 훅
export const useUpdateBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      token,
      bookmarkId,
    }: {
      postId: number;
      token?: string;
      bookmarkId?: number;
    }) => updateBookmark(postId, token, bookmarkId),

    onMutate: async ({ postId, bookmarkId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });

      const previousPosts = queryClient.getQueryData<CommunityPost[]>([
        QUERY_KEYS.POSTS,
      ]);

      // 낙관적 업데이트
      queryClient.setQueryData<CommunityPost[]>(
        [QUERY_KEYS.POSTS],
        (old) =>
          old?.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                bookmarks: bookmarkId
                  ? post.bookmarks?.filter(
                      (bookmark) => bookmark.id !== bookmarkId,
                    ) || []
                  : [
                      ...(post.bookmarks || []),
                      { id: -1, postId, userId: -1, createdAt: new Date() },
                    ],
                bookmarksCount: bookmarkId
                  ? post.bookmarksCount - 1
                  : post.bookmarksCount + 1,
              };
            }
            return post;
          }) || [],
      );

      return { previousPosts };
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });
    },
  });
};
