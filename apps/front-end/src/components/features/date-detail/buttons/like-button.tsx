import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { BASE_URL } from '@/constants/url.constants';
import { useUpdateLikeMutation } from '@/lib/mutations/like.mutation';
import { useQuery } from '@tanstack/react-query';
import { Like, Post } from '@use-navi-date/shared';

const LikeButton = ({ post }: { post: Post }) => {
  /* userId 불러오는 로직 추가 필요 (현재 임시 값) */
  const userId = 12;
  const token = '<temp_token>';

  const { mutate: toggleLike } = useUpdateLikeMutation();

  const getLike = async () => {
    const response = await fetch(`${BASE_URL}/likes?postId=${post.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const { data: like } = useQuery<Like[]>({
    queryKey: [QUERY_KEYS.LIKES],
    queryFn: getLike,
  });

  const userLike = like?.find((like) => like.userId === userId);
  const likeId = userLike?.id;

  const handleLike = () => {
    if (!userId) return;
    toggleLike({ postId: post.id, token, likeId });
  };

  return (
    <>
      {like && like.length > 0 ? (
        <button
          type="button"
          onClick={handleLike}
          className="w-20 h-8 bg-skin6 rounded-lg text-white text-[10px] font-extralight"
        >
          좋아요 취소
        </button>
      ) : (
        <button
          type="button"
          onClick={handleLike}
          className="w-20 h-8 bg-skin6 rounded-lg text-white text-[10px] font-extralight"
        >
          좋아요
        </button>
      )}
    </>
  );
};
export default LikeButton;
