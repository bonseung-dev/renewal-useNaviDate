import {
  Bookmark,
  CommunityPost,
  Like,
  Post,
  PostImage,
  PostTag,
  User,
} from '@use-navi-date/shared';
import { useMemo } from 'react';

/**
 * 포스트 데이터를 UI에 최적화된 형태로 변환하는 훅
 * - 생성일/삭제일을 Date 객체로 변환
 * - 연관된 태그, 이미지, 좋아요/북마크 수 결합
 */
export const useCommunityPosts = (
  posts: (Post & { images?: PostImage[]; imageUrl?: string; tags?: any[] })[],
  users: User[],
  likes: Like[],
  bookmarks: Bookmark[],
): CommunityPost[] => {
  return useMemo(() => {
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.userId);
      const postLikes = likes.filter((like) => like.postId === post.id);
      const postBookmarks = bookmarks.filter(
        (bookmark) => bookmark.postId === post.id,
      );

      return {
        ...post,
        createdAt: new Date(post.createdAt),
        deletedAt: post.deletedAt ? new Date(post.deletedAt) : null,
        author,
        tags: post.tags || [],
        images: post.images || [],
        likes: postLikes,
        likesCount: postLikes.length,
        bookmarks: postBookmarks,
        bookmarksCount: postBookmarks.length,
        imageUrl:
          post.images?.find((img) => img.isRepresentative)?.imageUrl || null,
      };
    });
  }, [posts, users, likes, bookmarks]);
};
