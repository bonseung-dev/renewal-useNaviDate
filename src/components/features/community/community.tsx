'use client';

import { useEffect, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import PostCard from './post-card';
import { SortOption } from '@/types/community.type';
import { useSearchQuery } from '@/lib/hooks/community/use-search-query';
import { useCommunityData } from '@/lib/hooks/community/use-community-data';
import { useEnhancedPosts } from '@/lib/hooks/community/use-enhanced-posts';
import { useSortedPosts } from '@/lib/hooks/community/use-sorted-posts';
import { SORT_OPTIONS } from '@/constants/community.constants';

const Community = () => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.LATEST);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('userId');
    setUserId(stored);
  }, []);

  const {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    handleKeyDown,
    handleExplicitSearch,
  } = useSearchQuery();

  const { posts, isLoading, users, couples, tags, images, likes, bookmarks } =
    useCommunityData(debouncedQuery);

  const enhancedPosts = useEnhancedPosts(
    posts,
    users,
    couples,
    tags,
    images,
    likes,
    bookmarks,
  );
  const sortedPosts = useSortedPosts(enhancedPosts, sortOption);

  if (isLoading)
    return <div className="text-center py-10 text-skin4">로딩 중...</div>;

  return (
    <div className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative">
      {/* 검색 + 정렬 */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative w-[252px] h-[30px]">
          <input
            type="text"
            placeholder="검색어(제목/태그)를 입력해주세요"
            className="w-full h-full rounded-full bg-font5 pl-3 pr-8 text-l-title4 font-light text-skin5 placeholder:text-skin5 focus:outline-none focus:bg-skin2"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <Search
            className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-skin5 cursor-pointer hover:text-skin1 transition-colors"
            onClick={handleExplicitSearch}
          />
        </div>

        <Select
          value={sortOption}
          onValueChange={(value: string) => setSortOption(value as SortOption)}
        >
          <SelectTrigger className="w-[20px] h-[20px]">
            <Menu className="w-5 h-5 text-skin1" />
          </SelectTrigger>
          <SelectContent className="w-[120px] h-[96px]">
            <SelectItem value={SORT_OPTIONS.LATEST}>최신순</SelectItem>
            <SelectItem value={SORT_OPTIONS.LIKES}>좋아요순</SelectItem>
            <SelectItem value={SORT_OPTIONS.BOOKMARKS}>북마크순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {debouncedQuery && (
        <div className="mb-1 text-b-h3 font-bold text-skin1">
          “{debouncedQuery}” 검색 결과 {sortedPosts.length}개
        </div>
      )}

      <div className="flex flex-col gap-[20px] mt-5">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isMyPost={userId === post.userId}
            />
          ))
        ) : (
          <div className="text-center py-10 text-skin4">
            {debouncedQuery ? '검색 결과가 없습니다' : '포스트가 없습니다'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
