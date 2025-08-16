import { BASE_URL } from '@/constants/url.constants';
import { Post, PostImage } from '@use-navi-date/shared';

export const fetchPostsByCouple = async (coupleId: number, token: string) => {
  try {
    // ${BASE_URL}/couples/${coupleId}/posts 혹은 ${BASE_URL}/posts/couples/${coupleId} 이런식으로 제공되면 좋을거 같음!!
    const postsRes = await fetch(`${BASE_URL}/posts?couple.id=${coupleId}`);
    const { data: posts }: { data: Post[] } = await postsRes.json();

    const calendarPosts = await Promise.all(
      posts.map(async (post) => {
        // 포스트 이미지 조회(수정이 필요할듯)
        const postImagesRes = await fetch(
          `${BASE_URL}/post-images/post/${post.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const postImages: PostImage[] = await postImagesRes.json();

        const representative = postImages.find((img) => img.isRepresentative);

        // console.log('포스트 이미지:', postImages);
        // console.log('대표 이미지:', representative);

        return {
          ...post,
          imageUrl: representative?.imageUrl || null,
          images: postImages,
        };
      }),
    );

    return calendarPosts;
  } catch (error) {
    console.error('포스트 데이터 조회 실패:', error);
    return [];
  }
};
