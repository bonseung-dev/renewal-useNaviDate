import { useQuery } from '@tanstack/react-query';
import {
  getAllPosts,
  getAllUsers,
  getAllCouples,
  getAllPostTags,
  getAllPostImages,
  getAllLikes,
  getAllBookmarks,
} from '@/lib/services/community.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

// 본 파일은 테스트 기간 동안 개발 및 수정 용이성을 위해 커뮤니티 관련 쿼리 훅들을 임시로 모아둔 파일입니다.
// 백엔드 db와 제대로 연결이 되면 분리할 예정입니다.

// 게시물 조회 쿼리
export const useGetAllPostsQuery = (debouncedQuery: string = '') => {
  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, { search: debouncedQuery }],
    queryFn: () => getAllPosts(debouncedQuery),
    enabled: true,
  });
};

// 사용자 조회 쿼리
export const useGetAllUsersQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS],
    queryFn: getAllUsers,
  });
};

// 커플 조회 쿼리
export const useGetAllCouplesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.COUPLES],
    queryFn: getAllCouples,
  });
};

// 태그 조회 쿼리
export const useGetAllPostTagsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TAGS],
    queryFn: getAllPostTags,
  });
};

// 이미지 조회 쿼리
export const useGetAllPostImagesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.IMAGES],
    queryFn: getAllPostImages,
  });
};

// 좋아요 조회 쿼리
export const useGetAllLikesQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.LIKES],
    queryFn: getAllLikes,
  });
};

// 북마크 조회 쿼리
export const useGetAllBookmarksQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BOOKMARKS],
    queryFn: getAllBookmarks,
  });
};
