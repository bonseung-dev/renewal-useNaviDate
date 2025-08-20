'use client';

import { useState } from 'react';
import { SortOption } from '@/types/community.type';
import { useSearchQuery } from '@/lib/hooks/community/use-search-query';
import { useCommunityPosts } from '@/lib/hooks/community/use-enhanced-posts';
import { useSortedPosts } from '@/lib/hooks/community/use-sorted-posts';
import { SORT_OPTIONS } from '@/constants/community.constants';
import CommunityStatus from './community-status';
import CommunityControls from './community-controls';
import PostList from './post-list';
import { usePostsData } from '@/lib/hooks/community/use-community-data';

type CommunityProps = {
  userId: number;
  token?: string;
};

const Community = ({ userId, token }: CommunityProps) => {
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.LATEST);

  const {
    searchQuery,
    debouncedQuery,
    handleSearchChange,
    handleKeyDown,
    handleExplicitSearch,
  } = useSearchQuery();

  const { posts, isLoading, users, tags, images, likes, bookmarks } =
    usePostsData(debouncedQuery, token);

  const postsWithUndefinedImageUrl = posts.map((post) => ({
    ...post,
    imageUrl: post.imageUrl === null ? undefined : post.imageUrl,
  }));
  const communityPosts = useCommunityPosts(
    postsWithUndefinedImageUrl,
    users,
    likes,
    bookmarks,
  );
  const sortedPosts = useSortedPosts(communityPosts, sortOption);

  // console.log('posts:', communityPosts);

  if (isLoading) return <CommunityStatus type="loading" />;

  return (
    <section
      className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative"
      aria-label="커뮤니티 포스트 목록"
    >
      <CommunityControls
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onExplicitSearch={handleExplicitSearch}
        sortOption={sortOption}
        onSortChange={setSortOption}
      />

      {debouncedQuery && (
        <h2 className="mb-1 text-m-h4 text-skin2">
          “{debouncedQuery}” 검색 결과 {sortedPosts.length}개
        </h2>
      )}

      <PostList
        posts={sortedPosts}
        searchQuery={debouncedQuery}
        userId={userId}
        token={token}
      />
    </section>
  );
};

export default Community;
