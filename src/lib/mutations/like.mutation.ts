import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLike } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { Post } from '@/types/post.type';
import { Like } from '@/types/like-bookmark.type';
import { CommunityPost } from '@/types/post.type';

// 좋아요 업데이트 뮤테이션 훅
export const useUpdateLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: number; userId: number }) =>
      updateLike(postId, userId),

    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.LIKES] });

      const previousPosts = queryClient.getQueryData<Post[]>([
        QUERY_KEYS.POSTS,
      ]);
      const previousLikes = queryClient.getQueryData<Like[]>([
        QUERY_KEYS.LIKES,
      ]);

      queryClient.setQueryData<CommunityPost[]>(
        [QUERY_KEYS.POSTS],
        (old) =>
          old?.map((post) => {
            if (post.id === postId) {
              const isLiked = post.likes?.some(
                (like) => like.userId === userId,
              );
              return {
                ...post,
                likes: isLiked
                  ? post.likes?.filter((like) => like.userId !== userId) || []
                  : [
                      ...(post.likes || []),
                      {
                        id: -1, // 임시 ID
                        postId,
                        userId,
                        createdAt: new Date(),
                      },
                    ],
                likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1,
              };
            }
            return post;
          }) || [],
      );

      queryClient.setQueryData<Like[]>([QUERY_KEYS.LIKES], (old) => {
        const isLiked = old?.some(
          (like) => like.postId === postId && like.userId === userId,
        );
        return isLiked
          ? old?.filter(
              (like) => !(like.postId === postId && like.userId === userId),
            ) || []
          : [
              ...(old || []),
              {
                id: -1,
                postId,
                userId,
                createdAt: new Date(),
              },
            ];
      });

      return { previousPosts, previousLikes };
    },

    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      if (context?.previousLikes) {
        queryClient.setQueryData([QUERY_KEYS.LIKES], context.previousLikes);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES] });
    },
  });
};
