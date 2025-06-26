'use client';

import Divider from '@/components/features/write-date/divider';
import PostVisibility from '@/components/features/write-date/post-visibility';
import SearchAddress from '@/components/features/write-date/search-address';
import SelectEmotion from '@/components/features/write-date/select_emotion';
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
