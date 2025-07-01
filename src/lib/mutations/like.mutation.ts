import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleLike } from '../services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { EnhancedPost, Like, Post } from '@/types/community.type';

// 좋아요 토글 뮤테이션 훅
export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      toggleLike(postId, userId),

    // 낙관적 업데이트 시작
    onMutate: async ({ postId, userId }) => {
      // 진행 중인 모든 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.POSTS] });
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.LIKES] });

      // 이전 데이터 스냅샷 저장
      const previousPosts = queryClient.getQueryData<Post[]>([
        QUERY_KEYS.POSTS,
      ]);
      const previousLikes = queryClient.getQueryData<Like[]>([
        QUERY_KEYS.LIKES,
      ]);

      // 새로운 데이터로 낙관적 업데이트
      queryClient.setQueryData<EnhancedPost[]>(
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
                        id: 'temp',
                        postId,
                        userId,
                        createdAt: new Date().toISOString(),
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
                id: 'temp',
                postId,
                userId,
                createdAt: new Date().toISOString(),
              },
            ];
      });

      return { previousPosts, previousLikes };
    },

    // 오류 발생 시 롤백
    onError: (err, variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([QUERY_KEYS.POSTS], context.previousPosts);
      }
      if (context?.previousLikes) {
        queryClient.setQueryData([QUERY_KEYS.LIKES], context.previousLikes);
      }
    },

    // 성공/실패 여부와 관계없이 최종 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES] });
    },
  });
};
