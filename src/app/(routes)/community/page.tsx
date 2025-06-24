'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Search, Menu, Heart } from 'lucide-react';
import { dummyData } from '@/lib/utils/dummy.utils';
import { EnhancedPost, SortOption } from '@/types/community.type';

const Page = () => {
  // 정렬 옵션 상태 관리
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  // 포스트 데이터 생성
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

  // 포스트 정렬 로직
  const sortedPosts = [...enhancedPosts].sort((a, b) => {
    if (sortOption === 'latest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortOption === 'likes') {
      return b.likes_count - a.likes_count;
    } else if (sortOption === 'bookmarks') {
      const aBookmarks = dummyData.bookmarks.filter(
        (bookmark) => bookmark.postId === a.id,
      ).length;
      const bBookmarks = dummyData.bookmarks.filter(
        (bookmark) => bookmark.postId === b.id,
      ).length;
      return bBookmarks - aBookmarks;
    }
    return 0;
  });

  return (
    <div className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative">
      {/* 검색 및 정렬 UI */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative w-[252px] h-[30px]">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full h-full rounded-full bg-font5 pl-3 pr-8 text-l-title4 text-skin5 placeholder:text-skin5 focus:outline-none  focus:bg-skin2"
          />
          <Search className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-skin5" />
        </div>

        <Select
          value={sortOption}
          onValueChange={(value: string) => setSortOption(value as SortOption)}
        >
          <SelectTrigger className="w-[20px] h-[20px]">
            <Menu className="w-5 h-5 text-skin1" />
          </SelectTrigger>
          <SelectContent className="w-[120px] h-[96px]">
            <SelectItem value="latest">최신순 정렬</SelectItem>
            <SelectItem value="likes">좋아요순 정렬</SelectItem>
            <SelectItem value="bookmarks">북마크순 정렬</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 포스트 카드 목록 */}
      <div className="flex flex-col gap-[20px] mt-5">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-md"
          >
            {/* 대표 이미지 렌더링 */}
            {post.images.length > 0 ? (
              (() => {
                const representativeImage = post.images.find(
                  (image) => image.isRepresentative,
                );
                const displayImage = representativeImage || post.images[0];
                return (
                  <Image
                    src={displayImage.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                );
              })()
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <span className="text-gray-500">이미지가 없습니다</span>
              </div>
            )}

            {/* 제목 및 태그 */}
            <div className="absolute top-[22px] left-0 w-full text-center px-2">
              <h3 className="text-white font-bold text-base line-clamp-1">
                {post.title}
              </h3>
              <div className="mt-1 text-white text-xs space-x-1">
                {post.tags.map((tag) => (
                  <span key={tag.id}>#{tag.name}</span>
                ))}
              </div>
            </div>

            {/* 하단 정보 */}
            <div className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full overflow-hidden relative">
                  <Image
                    src={post.author?.profileImage || '/default-profile.jpg'}
                    alt={post.couple?.name || '커플 프로필'}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    sizes="36px"
                  />
                </div>
                <div className="ml-2">
                  <div className="text-b-h4 font-bold text-skin5">
                    {post.couple?.name || 'Unknown Couple'}
                  </div>
                  <div className="text-l-title4 text-skin5">
                    {new Date(post.date).toLocaleDateString('ko-KR')}
                  </div>
                </div>
              </div>

              <button className="w-[72px] h-[32px] rounded-[12px] bg-white/50 text-font3 text-b-h3 font-bold flex items-center justify-center gap-1">
                <Heart className="w-4 h-4 fill-skin7 stroke-none" />
                <span className="text-white">{post.likes_count}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
