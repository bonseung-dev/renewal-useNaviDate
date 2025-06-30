import { BASE_URL } from '@/constants/url.constants';
import { ExtendedPost, Post, PostImage, PostTag } from '@/types/calendar.type';
import { Bookmark, Like } from '@/types/community.type';

export const fetchPostsByCouple = async (
  coupleId: string,
): Promise<ExtendedPost[]> => {
  try {
    const coupleRes = await fetch(`${BASE_URL}/couples/${coupleId}`);
    const couple = await coupleRes.json();

    const postsRes = await fetch(
      `${BASE_URL}/posts?userId=${couple.userAId}&userId=${couple.userBId}`,
    );
    const posts: Post[] = await postsRes.json();

    const extendedPosts: ExtendedPost[] = await Promise.all(
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
          createdAt:
            post.createdAt instanceof Date
              ? post.createdAt.toISOString()
              : post.createdAt,
          deletedAt:
            post.deletedAt instanceof Date
              ? post.deletedAt.toISOString()
              : post.deletedAt,
          imageUrl: images.find((img) => img.isRepresentative)?.imageUrl,
          likesCount: likes.length,
          bookmarksCount: bookmarks.length,
          images,
          tags,
        };
      }),
    );

    return extendedPosts;
  } catch (error) {
    console.error('포스트 데이터 조회 실패:', error);
    return [];
  }
};
