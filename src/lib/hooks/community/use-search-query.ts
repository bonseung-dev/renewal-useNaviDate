import { useState, useMemo, useCallback } from 'react';
import { createDebouncedSearch } from '@/lib/utils/coomunity.utils';
import { SEARCH_DEBOUNCE_DELAY } from '@/constants/community.constants';

/**
 * 검색 쿼리 상태와 디바운스된 검색 핸들링을 위한 커스텀 훅
 * @returns {{
 *   searchQuery: string;
 *   debouncedQuery: string;
 *   handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 *   handleKeyDown: (e: React.KeyboardEvent) => void;
 *   handleExplicitSearch: () => void;
 * }} 검색 상태와 핸들러 함수들을 포함한 객체
 */
export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  /**
   * 디바운스된 검색 함수 생성
   * - 입력이 멈춘 후 `SEARCH_DEBOUNCE_DELAY` 시간이 지나면 쿼리 업데이트
   */
  const debouncedSearch = useMemo(
    () =>
      createDebouncedSearch(SEARCH_DEBOUNCE_DELAY, (query: string) => {
        setDebouncedQuery(query);
      }),
    [],
  );

  /**
   * 입력 변경 핸들러
   * @param {React.ChangeEvent<HTMLInputElement>} e - 입력 이벤트 객체
   */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  /**
   * Enter 키 핸들러
   * @param {React.KeyboardEvent} e - 키보드 이벤트 객체
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        debouncedSearch.flush();
      }
    },
    [debouncedSearch],
  );

  /**
   * 명시적 검색 실행
   */
  const handleExplicitSearch = useCallback(() => {
    debouncedSearch.flush();
  }, [debouncedSearch]);

  return {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    handleKeyDown,
    handleExplicitSearch,
  };
};
