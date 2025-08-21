import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateLike } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { CommunityPost } from '@/types/post.type';

// 좋아요 업데이트 뮤테이션 훅
export const useUpdateLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      token,
      likeId,
    }: {
      postId: number;
      token?: string;
      likeId?: number;
    }) => updateLike(postId, token, likeId),

    onMutate: async ({ postId, likeId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.LIKES] });

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
                likes: likeId
                  ? post.likes?.filter((like) => like.id !== likeId) || []
                  : [
                      ...(post.likes || []),
                      { id: -1, postId, userId: -1, createdAt: new Date() },
                    ],
                likesCount: likeId ? post.likesCount - 1 : post.likesCount + 1,
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES] });
    },
  });
};
