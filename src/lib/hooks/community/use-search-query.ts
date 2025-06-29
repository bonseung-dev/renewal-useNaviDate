import { useState, useMemo, useEffect } from 'react';
import { createDebouncedSearch } from '@/lib/utils/coomunity.utils';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants/community.constants';

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [, setTriggerSearch] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      createDebouncedSearch(SEARCH_DEBOUNCE_DELAY, (query) =>
        setDebouncedQuery(query),
      ),
    [],
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') setTriggerSearch((prev) => !prev);
  };

  const handleExplicitSearch = () => {
    setTriggerSearch((prev) => !prev);
  };

  return {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    handleKeyDown,
    handleExplicitSearch,
  };
};
