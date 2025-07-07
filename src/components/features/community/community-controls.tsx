import { Search, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SORT_OPTIONS, SortOption } from '@/constants/community.constants';

type CommunityHeaderProps = {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onExplicitSearch: () => void;
  sortOption: SortOption;
  onSortChange: (value: SortOption) => void;
};

const CommunityControls = ({
  searchQuery,
  onSearchChange,
  onKeyDown,
  onExplicitSearch,
  sortOption,
  onSortChange,
}: CommunityHeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-2">
      <div className="relative w-[252px] h-[30px]">
        <input
          type="text"
          placeholder="검색어(제목/태그)를 입력해주세요"
          className="w-full h-full rounded-full bg-font5 pl-3 pr-8 text-l-title4 font-light text-skin5 placeholder:text-skin5 focus:outline-none focus:bg-skin2"
          value={searchQuery}
          onChange={onSearchChange}
          onKeyDown={onKeyDown}
          aria-label="검색어 입력"
        />
        <Search
          className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-skin5 cursor-pointer hover:text-skin1 transition-colors"
          onClick={onExplicitSearch}
          aria-label="검색 실행"
        />
      </div>

      <nav aria-label="정렬 옵션">
        <Select value={sortOption} onValueChange={onSortChange}>
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
  );
};

export default CommunityControls;
