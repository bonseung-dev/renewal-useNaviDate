'use client';

import Divider from '@/components/features/write-date/divider';
import PostVisibility from '@/components/features/write-date/post-visibility';
import SearchAddress from '@/components/features/write-date/search-address';
import SelectEmotion from '@/components/features/write-date/select_emotion';
import SubmitPost from '@/components/features/write-date/submit-post';
import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
import WriteContent from '@/components/features/write-date/write-content';
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
      <WriteContent />

      {/* 구분선 */}
      <Divider />

      {/* 태그 입력 */}
      <section className="my-3">
        <input
          type="text"
          placeholder="#태그입력"
          className="w-14 h-6 bg-skin2 rounded-[50px] text-[10px] text-center text-skin5 font-extralight placeholder:text-center placeholder:text-skin5"
        />
      </section>

      {/* 게시글 등록 */}
      <SubmitPost />
    </form>
  );
};

export default WriteDate;
