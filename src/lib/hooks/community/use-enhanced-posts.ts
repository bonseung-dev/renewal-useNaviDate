import { useMemo } from 'react';
import { createEnhancedPosts } from '@/lib/services/community.services';
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
    )
      return [];
    return createEnhancedPosts(
      posts,
      users,
      couples,
      tags,
      images,
      likes,
      bookmarks,
    );
  }, [posts, users, couples, tags, images, likes, bookmarks]);
};
