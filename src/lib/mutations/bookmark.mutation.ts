import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBookmark } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { Post } from '@/types/post.type';
import { Bookmark } from '@/types/like-bookmark.type';
import { CommunityPost } from '@/types/post.type';

// 북마크 업데이트 뮤테이션 훅
export const useUpdateBookmarkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      updateBookmark(postId, userId),

    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });

      const previousPosts = queryClient.getQueryData<Post[]>([
        QUERY_KEYS.POSTS,
      ]);
      const previousBookmarks = queryClient.getQueryData<Bookmark[]>([
        QUERY_KEYS.BOOKMARKS,
      ]);

      // 북마크 낙관적 업데이트
      queryClient.setQueryData<CommunityPost[]>(
        [QUERY_KEYS.POSTS],
        (old) =>
          old?.map((post) => {
            if (post.id === postId) {
              const isBookmarked = post.bookmarks?.some(
                (b) => b.userId === userId,
              );
              return {
                ...post,
                bookmarks: isBookmarked
                  ? post.bookmarks?.filter((b) => b.userId !== userId) || []
                  : [
                      ...(post.bookmarks || []),
                      {
                        id: -1, // 임시 ID
                        postId,
                        userId,
                        createdAt: new Date(),
                      },
                    ],
                bookmarksCount: isBookmarked
                  ? post.bookmarksCount - 1
                  : post.bookmarksCount + 1,
              };
            }
            return post;
          }) || [],
      );

      queryClient.setQueryData<Bookmark[]>([QUERY_KEYS.BOOKMARKS], (old) => {
        const isBookmarked = old?.some(
          (b) => b.postId === postId && b.userId === userId,
        );
        return isBookmarked
          ? old?.filter((b) => !(b.postId === postId && b.userId === userId)) ||
              []
          : [
              ...(old || []),
              {
                id: -1, // 임시 ID
                postId,
                userId,
                createdAt: new Date(),
              },
            ];
      });

      return { previousPosts, previousBookmarks };
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      if (context?.previousBookmarks) {
        queryClient.setQueryData(
          [QUERY_KEYS.BOOKMARKS],
          context.previousBookmarks,
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BOOKMARKS] });
    },
  });
};
