import { useMemo } from 'react';
import {
  Post,
  User,
  PostTag,
  PostImage,
  Like,
  Bookmark,
} from '@/types/community.type';

/**
 * 포스트 데이터를 UI에 최적화된 형태로 변환하는 훅
 * - 생성일/삭제일을 Date 객체로 변환
 * - 연관된 태그, 이미지, 좋아요/북마크 수 결합
 */
export const useEnhancedPosts = (
  posts?: Post[],
  users?: User[],
  tags?: PostTag[],
  images?: PostImage[],
  likes?: Like[],
  bookmarks?: Bookmark[],
) => {
  return useMemo(() => {
    if (!posts || !users || !tags || !images || !likes || !bookmarks) {
      console.warn('필수 데이터가 부족합니다');
      return [];
    }

    const userLookup = new Map(users.map((user) => [user.id, user]));
    const tagsByPostId = new Map<string, PostTag[]>();
    const imagesByPostId = new Map<string, PostImage[]>();
    const likesByPostId = new Map<string, Like[]>();
    const bookmarksByPostId = new Map<string, Bookmark[]>();

    // 데이터 그룹화
    tags.forEach((tag) => {
      tagsByPostId.set(tag.postId, [
        ...(tagsByPostId.get(tag.postId) || []),
        tag,
      ]);
    });

    images.forEach((image) => {
      imagesByPostId.set(image.postId, [
        ...(imagesByPostId.get(image.postId) || []),
        image,
      ]);
    });

    likes.forEach((like) => {
      likesByPostId.set(like.postId, [
        ...(likesByPostId.get(like.postId) || []),
        like,
      ]);
    });

    bookmarks.forEach((bookmark) => {
      bookmarksByPostId.set(bookmark.postId, [
        ...(bookmarksByPostId.get(bookmark.postId) || []),
        bookmark,
      ]);
    });

    const parseDateSafe = (dateString: string | null | undefined): Date => {
      if (!dateString) return new Date();
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    };

    return posts.map((post) => ({
      ...post,
      createdAt: parseDateSafe(post.createdAt),
      deletedAt: post.deletedAt ? parseDateSafe(post.deletedAt) : null,
      author: userLookup.get(post.userId),
      tags: tagsByPostId.get(post.id) || [],
      images: imagesByPostId.get(post.id) || [],
      likesCount: likesByPostId.get(post.id)?.length || 0,
      bookmarksCount: bookmarksByPostId.get(post.id)?.length || 0,
    }));
  }, [posts, users, tags, images, likes, bookmarks]);
};
