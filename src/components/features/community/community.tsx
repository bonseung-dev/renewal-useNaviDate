'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { EnhancedPost, SortOption } from '@/types/community.type';

import PostCard from './post-card';
import { debounce } from 'lodash';

const Community = ({ initialPosts }: { initialPosts: EnhancedPost[] }) => {
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [, setTriggerSearch] = useState(false); // 명시적 검색

  // 디바운싱 설정 (400ms 지연)
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedQuery(query);
      }, 400),
    [],
  );

  // 컴포넌트 언마운트 시 디바운스 취소
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // 엔터 키 또는 검색 아이콘 클릭 핸들러
  const handleExplicitSearch = () => {
    setTriggerSearch((prev) => !prev); // 상태 토글로 강제 리렌더링
  };

  // 검색 로직
  const filteredPosts = useMemo(() => {
    const query = debouncedQuery.toLowerCase();
    if (!query) return initialPosts;

    return initialPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(query);
      const tagMatch =
        post.tags?.some((tag) => tag.name.toLowerCase().includes(query)) ||
        false;
      return titleMatch || tagMatch;
    });
  }, [initialPosts, debouncedQuery]);

  // 정렬 로직
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort((a, b) => {
      if (sortOption === 'latest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortOption === 'likes') {
        return b.likesCount - a.likesCount;
      } else if (sortOption === 'bookmarks') {
        return b.bookmarksCount - a.bookmarksCount;
      }
      return 0;
    });
  }, [filteredPosts, sortOption]);

  // 엔터 키 감지
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExplicitSearch();
    }
  };

  return (
    <div className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative">
      {/* 검색 및 정렬 UI */}
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
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="likes">좋아요순</SelectItem>
            <SelectItem value="bookmarks">북마크순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 검색 결과 표시 */}
      {debouncedQuery && (
        <div className="mb-1 text-b-h3 font-bold text-skin1">
          &quot;{debouncedQuery}&quot; 검색 결과 {sortedPosts.length}개
        </div>
      )}

      {/* 포스트 카드 목록 */}
      <div className="flex flex-col gap-[20px] mt-5">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => <PostCard key={post.id} post={post} />)
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
