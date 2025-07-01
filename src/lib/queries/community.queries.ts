import { useQuery } from '@tanstack/react-query';
import {
  fetchPosts,
  fetchUsers,
  fetchCouples,
  fetchPostTags,
  fetchPostImages,
  fetchLikes,
  fetchBookmarks,
} from '@/lib/services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

// 게시물 조회 쿼리
export const usePostsQuery = (debouncedQuery: string = '') => {
  return useQuery({
    queryKey: ['posts', { search: debouncedQuery }],
    queryFn: () => fetchPosts(debouncedQuery),
    enabled: true,
  });
};
// 사용자 조회 쿼리
export const useUsersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: fetchUsers,
  });
};

// 커플 조회 쿼리
export const useCouplesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COUPLES],
    queryFn: fetchCouples,
  });
};

// 태그 조회 쿼리
export const usePostTagsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TAGS],
    queryFn: fetchPostTags,
  });
};

// 이미지 조회 쿼리
export const usePostImagesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IMAGES],
    queryFn: fetchPostImages,
  });
};

// 좋아요 조회 쿼리
export const useLikesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LIKES],
    queryFn: fetchLikes,
  });
};

// 북마크 조회 쿼리
export const useBookmarksQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKMARKS],
    queryFn: fetchBookmarks,
  });
};
