import { BASE_URL } from '@/constants/url.constants';
import { Post, PostImage } from '@use-navi-date/shared';

export const fetchPostsByCouple = async (coupleId: number, token: string) => {
  try {
    // ${BASE_URL}/couples/${coupleId}/posts 처럼 coupleId를 이용해 포스트를 가져오는 API를 사용하면 좋을 거 같음
    const postsRes = await fetch(`${BASE_URL}/posts`);

    const { data: posts }: { data: Post[] } = await postsRes.json();

    // console.log('포스트 데이터:', posts);

    const calendarPosts = await Promise.all(
      posts.map(async (post) => {
        // 포스트 이미지 조회 `${BASE_URL}/postImages/post/${post.id}`,
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
