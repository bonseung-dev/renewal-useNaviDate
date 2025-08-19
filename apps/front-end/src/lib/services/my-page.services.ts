import { BASE_URL } from '@/constants/url.constants';
import { Post, PostImage } from '@use-navi-date/shared';

export const getMyPosts = async (
  userId: number,
  token?: string,
): Promise<(Post & { images: PostImage[]; imageUrl: string | null })[]> => {
  const res = await fetch(`${BASE_URL}/posts/my/${userId}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });
  if (!res.ok) throw new Error('내 포스트를 가져오는데 실패했습니다.');

  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error('내 포스트 데이터 형식이 올바르지 않습니다.');
  }

  const posts: Post[] = json.data;

  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      try {
        const imagesRes = await fetch(
          `${BASE_URL}/post-images/post/${post.id}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : undefined,
          },
        );
        const postImages: PostImage[] = await imagesRes.json();
        const representative = postImages.find((img) => img.isRepresentative);

        console.log(postImages, representative);

        return {
          ...post,
          images: postImages,
          imageUrl: representative?.imageUrl || null,
          tags: [],
        };
      } catch (err) {
        console.error(`Post ${post.id} 이미지 불러오기 실패:`, err);
        return { ...post, images: [], imageUrl: null, tags: [] };
      }
    }),
  );

  return postsWithImages;
};
