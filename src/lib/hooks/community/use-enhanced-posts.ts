import { useMemo } from 'react';
import {
  Post,
  User,
  Couple,
  PostTag,
  PostImage,
  Like,
  Bookmark,
} from '@/types/community.type';

export const useEnhancedPosts = (
  posts?: Post[],
  users?: User[],
  couples?: Couple[],
  tags?: PostTag[],
  images?: PostImage[],
  likes?: Like[],
  bookmarks?: Bookmark[],
) => {
  return useMemo(() => {
    if (
      !posts ||
      !users ||
      !couples ||
      !tags ||
      !images ||
      !likes ||
      !bookmarks
    ) {
      return [];
    }

    // 사용자 조회를 위한 Lookup 테이블 생성
    const userLookup = new Map<string, User>(
      users.map((user) => [user.id, user]),
    );

    // 데이터 그룹화를 위한 Map 생성
    const tagsByPostId = new Map<string, PostTag[]>();
    const imagesByPostId = new Map<string, PostImage[]>();
    const likesByPostId = new Map<string, Like[]>();
    const bookmarksByPostId = new Map<string, Bookmark[]>();

    // 태그 그룹화
    tags.forEach((tag) => {
      if (!tagsByPostId.has(tag.postId)) tagsByPostId.set(tag.postId, []);
      tagsByPostId.get(tag.postId)?.push(tag);
    });

    // 이미지 그룹화
    images.forEach((image) => {
      if (!imagesByPostId.has(image.postId))
        imagesByPostId.set(image.postId, []);
      imagesByPostId.get(image.postId)?.push(image);
    });

    // 좋아요 그룹화
    likes.forEach((like) => {
      if (!likesByPostId.has(like.postId)) likesByPostId.set(like.postId, []);
      likesByPostId.get(like.postId)?.push(like);
    });

    // 북마크 그룹화
    bookmarks.forEach((bookmark) => {
      if (!bookmarksByPostId.has(bookmark.postId)) {
        bookmarksByPostId.set(bookmark.postId, []);
      }
      bookmarksByPostId.get(bookmark.postId)?.push(bookmark);
    });

    // 안전한 날짜 파싱 함수
    const parseDateSafe = (dateString: string | null | undefined): Date => {
      if (!dateString) return new Date();
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? new Date() : date;
    };

    // 포스트 변환
    return posts.map((post) => {
      const user = userLookup.get(post.userId);
      const couple = couples.find(
        (c) => c.userAId === post.userId || c.userBId === post.userId,
      );

      // 파트너 찾기
      const partner = couple
        ? userLookup.get(
            couple.userAId === post.userId ? couple.userBId : couple.userAId,
          )
        : undefined;

      return {
        ...post,
        createdAt: parseDateSafe(post.createdAt),
        deletedAt: post.deletedAt ? parseDateSafe(post.deletedAt) : null,
        couple,
        author: user,
        partner,
        tags: tagsByPostId.get(post.id) || [],
        images: imagesByPostId.get(post.id) || [],
        likesCount: likesByPostId.get(post.id)?.length || 0,
        bookmarksCount: bookmarksByPostId.get(post.id)?.length || 0,
      };
    });
  }, [posts, users, couples, tags, images, likes, bookmarks]);
};
