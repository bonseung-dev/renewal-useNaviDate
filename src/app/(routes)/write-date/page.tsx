'use client';

import PostVisibility from '@/components/features/write-date/post-visibility';
import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
import Image from 'next/image';
// import Image from 'next/image';
import React, { useState } from 'react';

const WriteDate = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <form className="flex flex-col justify-center items-center px-1">
      {/* 캐러셀 이미지 업로드 */}
      <UploadImageCarousel imageUrls={imageUrls} setImageUrls={setImageUrls} />

      {/* 게시글 공개 여부 */}
      <PostVisibility />

      {/* 주소 검색 */}
      <div className="relative flex flex-col gap-1 items-center justify-center">
        <div className="text-[10px] text-skin1 font-semibold flex items-start justify-start mr-auto">
          주소
        </div>
        <div className="w-72 h-6 bg-skin2 rounded-full">
          <div className="flex items-center pl-3 py-1 w-full h-full text-skin5 text-xs font-extralight whitespace-nowrap">
            테스트
          </div>
          <button>
            <Image
              src="/search-icon.png"
              alt="search icon"
              unoptimized
              className="ml-[2px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/5"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>

      {/* 기분 선택 */}
      <section>
        <button>기분1</button>
        <button>기분2</button>
        <button>기분3</button>
        <button>기분4</button>
        <button>기분5</button>
      </section>

      <section>
        {/* 제목 입력 */}
        <input type="text" placeholder="제목을 입력해주세요." />
      </section>

      <section>
        {/* 달력 */}
        <button>달력</button>
        {/* 내용 입력 */}
        <div>
          <input type="text" placeholder="내용을 입력해주세요." />
        </div>
      </section>

      {/* 태그 입력 */}
      <section>
        <input type="text" placeholder="#태그" />
        <input type="text" placeholder="#태그" />
        <input type="text" placeholder="#태그" />
        <input type="text" placeholder="#태그" />
      </section>

      <section>
        {/* 게시글 등록 */}
        <button>게시글 등록</button>
      </section>
    </form>
  );
};

export default WriteDate;
