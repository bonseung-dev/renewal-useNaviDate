import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { BASE_URL } from '@/constants/url.constants';
import { useUpdateBookmarkMutation } from '@/lib/mutations/bookmark.mutation';
import { Bookmark } from '@/types/like-bookmark.type';
import { Post } from '@/types/post.type';
import { useQuery } from '@tanstack/react-query';

const BookmarkButton = ({ post }: { post: Post }) => {
  /* userId 불러오는 로직 추가 필요 (현재 임시 값) */
  const userId = 123;

  const { mutate: toggleBookmark } = useUpdateBookmarkMutation();

  const handleBookmark = () => {
    if (!userId) return;
    toggleBookmark({ postId: post.id, userId });
  };

  const getBookmark = async () => {
    const response = await fetch(`${BASE_URL}/bookmarks?postId=${post.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const { data: bookmark } = useQuery<Bookmark[]>({
    queryKey: [QUERY_KEYS.BOOKMARKS],
    queryFn: getBookmark,
  });

  return (
    <>
      {bookmark && bookmark.length > 0 ? (
        <button
          type="button"
          onClick={handleBookmark}
          className="w-20 h-8 bg-skin7 rounded-lg text-white text-[10px] font-extralight"
        >
          북마크 취소
        </button>
      ) : (
        <button
          type="button"
          onClick={handleBookmark}
          className="w-20 h-8 bg-skin7 rounded-lg text-white text-[10px] font-extralight"
        >
          북마크
        </button>
      )}
    </>
  );
};

export default BookmarkButton;
