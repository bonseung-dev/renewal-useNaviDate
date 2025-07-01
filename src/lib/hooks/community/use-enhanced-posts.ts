import { useMemo } from 'react';
import {
  Post,
  User,
  PostTag,
  PostImage,
  Like,
  Bookmark,
  EnhancedPost,
} from '@/types/community.type';

/**
 * 포스트 데이터를 UI에 최적화된 형태로 변환하는 훅
 * - 생성일/삭제일을 Date 객체로 변환
 * - 연관된 태그, 이미지, 좋아요/북마크 수 결합
 */
export const useEnhancedPosts = (
  posts: Post[],
  users: User[],
  tags: PostTag[],
  images: PostImage[],
  likes: Like[],
  bookmarks: Bookmark[],
): EnhancedPost[] => {
  return useMemo(() => {
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.userId);
      const postTags = tags.filter((tag) => tag.postId === post.id);
      const postImages = images.filter((image) => image.postId === post.id);
      const postLikes = likes.filter((like) => like.postId === post.id);
      const postBookmarks = bookmarks.filter(
        (bookmark) => bookmark.postId === post.id,
      );

      return {
        ...post,
        createdAt: new Date(post.createdAt),
        deletedAt: post.deletedAt ? new Date(post.deletedAt) : null,
        author,
        tags: postTags,
        images: postImages,
        likes: postLikes,
        likesCount: postLikes.length,
        bookmarks: postBookmarks,
        bookmarksCount: postBookmarks.length,
      };
    });
  }, [posts, users, tags, images, likes, bookmarks]);
};
