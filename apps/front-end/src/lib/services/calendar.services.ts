import { BASE_URL } from '@/constants/url.constants';
import { Bookmark, Like } from '@/types/like-bookmark.type';
import { CalendarPost, Post, PostImage, PostTag } from '@/types/post.type';

export const fetchPostsByCouple = async (
  coupleId: number,
): Promise<
  (CalendarPost & {
    imageUrl?: string;
    likesCount: number;
    bookmarksCount: number;
    tags: PostTag[];
  })[]
> => {
  try {
    const coupleRes = await fetch(`${BASE_URL}/couples?id=${coupleId}`);
    const couple = await coupleRes.json();

    const postsRes = await fetch(
      `${BASE_URL}/posts?userId=${couple.userAId}&userId=${couple.userBId}`,
    );
    const posts: Post[] = await postsRes.json();

    const calendarPosts = await Promise.all(
      posts.map(async (post) => {
        const [imagesRes, tagsRes, likesRes, bookmarksRes] = await Promise.all([
          fetch(`${BASE_URL}/postImages?postId=${post.id}`),
          fetch(`${BASE_URL}/postTags?postId=${post.id}`),
          fetch(`${BASE_URL}/likes?postId=${post.id}`),
          fetch(`${BASE_URL}/bookmarks?postId=${post.id}`),
        ]);

        const images: PostImage[] = await imagesRes.json();
        const tags: PostTag[] = await tagsRes.json();
        const likes: Like[] = await likesRes.json();
        const bookmarks: Bookmark[] = await bookmarksRes.json();

        return {
          ...post,
          imageUrl: images.find((img) => img.isRepresentative)?.postImage.url,
          likesCount: likes.length,
          bookmarksCount: bookmarks.length,
          images,
          tags,
        };
      }),
    );

    return calendarPosts;
  } catch (error) {
    console.error('포스트 데이터 조회 실패:', error);
    return [];
  }
};
