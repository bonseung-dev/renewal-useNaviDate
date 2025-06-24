'use client';

import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { EnhancedPost, SortOption } from '@/types/community.type';
import dummyData from '@/lib/utils/dummy.utils';
import PostCard from './post-card';

const Community = ({ initialPosts }: { initialPosts: EnhancedPost[] }) => {
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  // 포스트 정렬 로직
  const sortedPosts = [...initialPosts].sort((a, b) => {
    if (sortOption === 'latest') {
      return b.createdAt.getTime() - a.createdAt.getTime();
    } else if (sortOption === 'likes') {
      return b.likesCount - a.likesCount;
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
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Community;
