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
    <section
      className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative"
      aria-label="커뮤니티 포스트 목록"
    >
      {/* 검색 + 정렬 */}
      <header className="flex items-center justify-between mb-2">
        <div className="relative w-[252px] h-[30px]">
          <input
            type="text"
            placeholder="검색어(제목/태그)를 입력해주세요"
            className="w-full h-full rounded-full bg-font5 pl-3 pr-8 text-l-title4 font-light text-skin5 placeholder:text-skin5 focus:outline-none focus:bg-skin2"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            aria-label="검색어 입력"
          />
          <Search
            className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-skin5 cursor-pointer hover:text-skin1 transition-colors"
            onClick={handleExplicitSearch}
            aria-label="검색 실행"
          />
        </div>

        {/* 정렬 드롭다운 */}
        <nav aria-label="정렬 옵션">
          <Select
            value={sortOption}
            onValueChange={(value: SortOption) => setSortOption(value)}
          >
            <SelectTrigger className="w-[20px] h-[20px]">
              <Menu className="w-5 h-5 text-skin1" aria-hidden="true" />
            </SelectTrigger>
            <SelectContent className="w-[120px] h-[96px]">
              <SelectItem value={SORT_OPTIONS.LATEST}>최신순</SelectItem>
              <SelectItem value={SORT_OPTIONS.LIKES}>좋아요순</SelectItem>
              <SelectItem value={SORT_OPTIONS.BOOKMARKS}>북마크순</SelectItem>
            </SelectContent>
          </Select>
        </nav>
      </header>

      {/* 검색 결과 */}
      {debouncedQuery && (
        <h2 className="mb-1 text-b-h3 font-bold text-skin1">
          “{debouncedQuery}” 검색 결과 {sortedPosts.length}개
        </h2>
      )}

      {/* 포스트 리스트 */}
      <div className="flex flex-col gap-[20px] mt-5" role="list">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              aria-labelledby={`post-${post.id}-title`}
              role="listitem"
            >
              <PostCard post={post} isMyPost={userId === post.userId} />
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-skin4" role="status">
            {debouncedQuery ? '검색 결과가 없습니다' : '포스트가 없습니다'}
          </div>
        )}
      </div>
    </section>
  );
};

export default Community;
