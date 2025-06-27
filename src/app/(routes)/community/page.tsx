import Community from '@/components/features/community/community';
import dummyData from '@/lib/utils/dummy.utils';
import { EnhancedPost } from '@/types/community.type';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community || useNavidate()',
  description: '다른 커플들의 특별한 순간을 공유하고 소통해보세요',
  robots: {
    index: false,
  },
  openGraph: {
    title: '  useNavidate() - Community',
    description: '사랑의 순간을 함께 나누는 공간',
    images: '/navidate-logo_blue.png',
  },
};

const Page = () => {
  // public인 포스트만 필터링 후 임시 데이터 생성
  const enhancedPosts: EnhancedPost[] = dummyData.posts
    .filter((post) => post.visibility === 'public')
    .map((post) => {
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
      const likesCount = dummyData.likes.filter(
        (like) => like.postId === post.id,
      ).length;

      const bookmarksCount = dummyData.bookmarks.filter(
        (bookmark) => bookmark.postId === post.id,
      ).length;

      return {
        ...post,
        couple,
        author,
        partner,
        tags,
        images,
        likesCount,
        bookmarksCount,
      };
    });

  return <Community initialPosts={enhancedPosts} />;
};

export default Page;
