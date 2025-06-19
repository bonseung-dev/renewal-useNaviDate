'use client';

import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';

const WriteDate = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <form>
      {/* 캐러셀 이미지 업로드 */}
      <UploadImageCarousel imageUrls={imageUrls} setImageUrls={setImageUrls} />

      {/* 주소 검색 */}
      <section>
        <input type="text" />
        <button>검색</button>
      </section>

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
        {/* 기록 공개 여부 */}
        <div>
          <label htmlFor="public">기록 공개 여부</label>
          <Switch id="public" />
          <p>
            기록 공개 시 다른 사람들이 이 게시글을 볼 수 있어요!
            <br /> 개인정보나 얼굴 사진이 유출되지 않도록 주의해주세요!
          </p>
        </div>
        {/* 게시글 등록 */}
        <button>게시글 등록</button>
      </section>
    </form>
  );
};

export default WriteDate;
