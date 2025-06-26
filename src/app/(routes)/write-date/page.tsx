'use client';

import Divider from '@/components/features/write-date/divider';
import PostVisibility from '@/components/features/write-date/post-visibility';
import SearchAddress from '@/components/features/write-date/search-address';
import SelectEmotion from '@/components/features/write-date/select_emotion';
import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
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
      <SearchAddress />

      {/* 기분 선택 */}
      <SelectEmotion />

      {/* 구분선 */}
      <Divider />

      {/* 내용 입력 */}
      <section className="w-full flex flex-col justify-center items-center gap-2 mt-2">
        <div className="flex items-center justify-between w-full px-5 gap-1">
          <button className="w-11 h-5 rounded-[50px] border border-skin7 text-xs font-extralight text-skin7">
            달력
          </button>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            className="w-full text-left placeholder:text-center placeholder:text-skin2 text-sm font-extralight"
          />
        </div>
        <div className="w-full px-5">
          <textarea
            placeholder="내용을 입력해주세요."
            className="w-full placeholder:text-center placeholder:text-skin2 text-sm font-extralight"
          />
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
