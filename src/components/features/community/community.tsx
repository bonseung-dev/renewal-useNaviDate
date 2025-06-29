'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import {
  EnhancedPost,
  SortOption,
  User,
  Couple,
  PostTag,
  PostImage,
  Like,
  Bookmark,
  Post,
} from '@/types/community.type';
import PostCard from './post-card';
import { debounce } from 'lodash';

const Community = () => {
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [, setTriggerSearch] = useState(false);

  // 로그인한 사용자 ID 가져오기
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId);
  }, []);

  // 데이터 가져오기
  const { data: postsData, isLoading: postsLoading } = useQuery<Post[]>({
    queryKey: ['posts', debouncedQuery],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/posts?visibility=public${
          debouncedQuery ? `&q=${encodeURIComponent(debouncedQuery)}` : ''
        }`,
      );
      if (!response.ok) throw new Error('포스트를 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  const { data: usersData } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/users');
      if (!response.ok) throw new Error('사용자를 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  const { data: couplesData } = useQuery<Couple[]>({
    queryKey: ['couples'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/couples');
      if (!response.ok) throw new Error('커플을 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  const { data: postTagsData } = useQuery<PostTag[]>({
    queryKey: ['postTags'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/postTags');
      if (!response.ok) throw new Error('태그를 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  const { data: postImagesData } = useQuery<PostImage[]>({
    queryKey: ['postImages'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/postImages');
      if (!response.ok) throw new Error('이미지를 가져오는데 실패했습니다.');
      return response.json(); // 오타 수정: response.json -> response.json()
    },
  });

  const { data: likesData } = useQuery<Like[]>({
    queryKey: ['likes'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/likes');
      if (!response.ok) throw new Error('좋아요를 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  const { data: bookmarksData } = useQuery<Bookmark[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:4000/bookmarks');
      if (!response.ok) throw new Error('북마크를 가져오는데 실패했습니다.');
      return response.json();
    },
  });

  // 디바운싱 설정 (400ms 지연)
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setDebouncedQuery(query);
      }, 400),
    [],
  );

  // 컴포넌트 언마운트 시 디바운스 취소
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value);
  };

  // 엔터 키 또는 검색 아이콘 클릭 핸들러
  const handleExplicitSearch = () => {
    setTriggerSearch((prev) => !prev);
  };

  // 엔터 키 감지
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExplicitSearch();
    }
  };

  // EnhancedPost 생성
  const enhancedPosts: EnhancedPost[] = useMemo(() => {
    if (
      !postsData ||
      !usersData ||
      !couplesData ||
      !postTagsData ||
      !postImagesData ||
      !likesData ||
      !bookmarksData
    ) {
      return [];
    }

    return postsData.map((post) => ({
      ...post,
      createdAt: new Date(post.createdAt),
      deletedAt: post.deletedAt ? new Date(post.deletedAt) : null,
      couple: couplesData.find(
        (c) => c.userAId === post.userId || c.userBId === post.userId,
      ),
      author: usersData.find((u) => u.id === post.userId),
      partner: couplesData.find(
        (c) => c.userAId === post.userId || c.userBId === post.userId,
      )
        ? usersData.find((u) => {
            const couple = couplesData.find(
              (c) => c.userAId === post.userId || c.userBId === post.userId,
            );
            return (
              u.id ===
              (couple?.userAId === post.userId
                ? couple?.userBId
                : couple?.userAId)
            );
          })
        : undefined,
      tags: postTagsData.filter((tag) => tag.postId === post.id),
      images: postImagesData.filter(
        (image: PostImage) => image.postId === post.id,
      ), // 타입 명시
      likesCount: likesData.filter((like) => like.postId === post.id).length,
      bookmarksCount: bookmarksData.filter(
        (bookmark) => bookmark.postId === post.id,
      ).length,
    }));
  }, [
    postsData,
    usersData,
    couplesData,
    postTagsData,
    postImagesData,
    likesData,
    bookmarksData,
  ]);

  // 정렬 로직
  const sortedPosts = useMemo(() => {
    return [...enhancedPosts].sort((a, b) => {
      if (sortOption === 'latest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else if (sortOption === 'likes') {
        return b.likesCount - a.likesCount;
      } else if (sortOption === 'bookmarks') {
        return b.bookmarksCount - a.bookmarksCount;
      }
      return 0;
    });
  }, [enhancedPosts, sortOption]);

  if (postsLoading) {
    return <div className="text-center py-10 text-skin4">로딩 중...</div>;
  }

  return (
    <div className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative">
      {/* 검색 및 정렬 UI */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative w-[252px] h-[30px]">
          <input
            type="text"
            placeholder="검색어(제목/태그)를 입력해주세요"
            className="w-full h-full rounded-full bg-font5 pl-3 pr-8 text-l-title4 font-light text-skin5 placeholder:text-skin5 focus:outline-none focus:bg-skin2"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <Search
            className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-skin5 cursor-pointer hover:text-skin1 transition-colors"
            onClick={handleExplicitSearch}
          />
        </div>

        <Select
          value={sortOption}
          onValueChange={(value: string) => setSortOption(value as SortOption)}
        >
          <SelectTrigger className="w-[20px] h-[20px]">
            <Menu className="w-5 h-5 text-skin1" />
          </SelectTrigger>
          <SelectContent className="w-[120px] h-[96px]">
            <SelectItem value="latest">최신순</SelectItem>
            <SelectItem value="likes">좋아요순</SelectItem>
            <SelectItem value="bookmarks">북마크순</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 검색 결과 표시 */}
      {debouncedQuery && (
        <div className="mb-1 text-b-h3 font-bold text-skin1">
          {'}{debouncedQuery}{'} 검색 결과 {sortedPosts.length}개
        </div>
      )}

      {/* 포스트 카드 목록 */}
      <div className="flex flex-col gap-[20px] mt-5">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isMyPost={userId === post.userId}
            />
          ))
        ) : (
          <div className="text-center py-10 text-skin4">
            {debouncedQuery ? '검색 결과가 없습니다' : '포스트가 없습니다'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
