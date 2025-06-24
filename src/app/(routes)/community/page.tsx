import Community from '@/components/features/community/community';
import dummyData from '@/lib/utils/dummy.utils';
import { EnhancedPost } from '@/types/community.type';

const Page = () => {
  // 임시 포스트 데이터 생성
  const enhancedPosts: EnhancedPost[] = dummyData.posts.map((post) => {
    const couple = dummyData.couples.find(
      (c) => c.userAId === post.userId || c.userBId === post.userId,
    );
    const author = dummyData.users.find((u) => u.id === post.userId);
    const partner = couple
      ? dummyData.users.find(
          (u) =>
            u.id ===
            (couple.userAId === author?.id ? couple.userBId : couple.userAId),
        )
      : undefined;
    const tags = dummyData.postTags.filter((tag) => tag.postId === post.id);
    const images = dummyData.postImages.filter(
      (image) => image.postId === post.id,
    );
    const likes_count = dummyData.likes.filter(
      (like) => like.postId === post.id,
    ).length;

    return {
      ...post,
      couple,
      author,
      partner,
      tags,
      images,
      likes_count,
    };
  });

  return <Community initialPosts={enhancedPosts} />;
};

export default Page;
