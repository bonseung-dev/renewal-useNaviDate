import { useState, useMemo } from 'react';
import { createDebouncedSearch } from '@/lib/utils/coomunity.utils';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants/community.constants';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSearch = useMemo(
    () =>
      createDebouncedSearch(SEARCH_DEBOUNCE_DELAY, (query) => {
        setDebouncedQuery(query);
      }),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      debouncedSearch.flush(); // 즉시 실행
    }
  };

  const handleExplicitSearch = () => {
    debouncedSearch.flush(); // 즉시 실행
  };

  return {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    handleKeyDown,
    handleExplicitSearch,
  };
};
