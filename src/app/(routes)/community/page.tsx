'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Search, Menu, Heart } from 'lucide-react';

const dummyPosts = [
  {
    id: '1',
    title: '제목이란다',
    tags: ['데이트', '겨울소풍', '서울대공원'],
    image:
      'https://i.pinimg.com/736x/58/9c/1e/589c1e80cdaa3d6a511c3d301a1d4a9b.jpg',
    date: '2025-06-23',
    likes: 50,
    user: {
      nickname: '커플1',
      profileImage:
        'https://i.pinimg.com/736x/1b/43/19/1b4319b3460196ec794dc62ebbbb031a.jpg',
    },
  },
  {
    id: '2',
    title: '제목쓰다쓰',
    tags: ['미팅', '상암데이트', '핫플공부', '한남동'],
    image:
      'https://i.pinimg.com/736x/0f/51/6c/0f516c4e3bc5ab67f5f4daac700706c2.jpg',
    date: '2025-06-10',
    likes: 32,
    user: {
      nickname: '커플2',
      profileImage:
        'https://i.pinimg.com/736x/82/9a/d2/829ad28cf4cca18160d685ead497523b.jpg',
    },
  },
];

const Page = () => {
  const [sortOption, setSortOption] = useState('latest');

  return (
    <div className="w-full max-w-[360px] px-4 pt-3 pb-[114px] mx-auto relative">
      {/* 검색창 + 정렬 */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative w-[252px] h-[30px]">
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            className="w-full h-full rounded-full border border-gray-300 pl-3 pr-8 text-sm text-font4 placeholder:text-font4 focus:outline-none focus:ring-1 focus:ring-skin1"
          />
          <Search className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-4 text-font4" />
        </div>

        {/* 정렬 드롭다운 */}
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[20px] h-[20px]">
            <Menu className="w-5 h-5 text-skin1" />
          </SelectTrigger>
          <SelectContent className="w-[120px] h-[96px]">
            <SelectItem value="latest">최신순 정렬</SelectItem>
            <SelectItem value="likes">좋아요순 정렬</SelectItem>
            <SelectItem value="bookmarks">북마크순 정렬</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 포스트 카드 */}
      <div className="flex flex-col gap-[20px] mt-5">
        {dummyPosts.map((post) => (
          <div
            key={post.id}
            className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-md"
          >
            {/* 대표 이미지 */}
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />

            {/* 제목 + 태그 */}
            <div className="absolute top-[22px] left-0 w-full text-center px-2">
              <h3 className="text-white font-bold text-base line-clamp-1">
                {post.title}
              </h3>
              <div className="mt-1 text-white text-xs space-x-1">
                {post.tags.map((tag, idx) => (
                  <span key={idx}>#{tag}</span>
                ))}
              </div>
            </div>

            {/* 하단 정보 */}
            <div className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full overflow-hidden">
                  <Image
                    src={post.user.profileImage}
                    alt={post.user.nickname}
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-2">
                  <div className="text-xs font-bold text-skin5">
                    {post.user.nickname}
                  </div>
                  <div className="text-[10px] text-skin5">{post.date}</div>
                </div>
              </div>

              <button className="w-[72px] h-[32px] rounded-[12px] bg-white/50 text-skin7 text-xs font-semibold flex items-center justify-center gap-1">
                <Heart className="w-4 h-4 fill-skin7" />
                {post.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
