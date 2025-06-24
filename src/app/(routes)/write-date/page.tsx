'use client';

import UploadImageCarousel from '@/components/features/write-date/upload-image-carousel';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import React, { useState } from 'react';

const WriteDate = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  return (
    <form>
      {/* 캐러셀 이미지 업로드 */}
      <UploadImageCarousel imageUrls={imageUrls} setImageUrls={setImageUrls} />

      {/* 기록 공개 여부 */}
      <section className="flex justify-end items-center gap-[2px] mr-10 mt-1">
        <label
          htmlFor="public"
          className="text-[8px] flex items-center gap-[1px] text-skin1"
        >
          비공개
          <Switch id="public" className="w-6 h-3" />
        </label>
        <div className="relative flex items-center group">
          <Image
            src="/tooltip-question-mark.png"
            alt="tooltip questionMark"
            unoptimized
            className="ml-[2px] cursor-pointer"
            width={12}
            height={12}
          />
          <div className="absolute left-1/2 -translate-x-full top-full z-10 hidden group-hover:flex w-64 h-11 px-3 py-2 bg-skin5 text-font4 text-[9px] rounded-tl-lg rounded-bl-lg rounded-br-lg shadow-[1px_1px_5px_0px_rgba(0,0,0,0.15)]">
            기록 공개 시 다른 사람들이 이 게시글을 볼 수 있어요! 사진과 같은
            개인 정보가 노출되지 않도록 주의하세요.
          </div>
        </div>
      </section>

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
        {/* 게시글 등록 */}
        <button>게시글 등록</button>
      </section>
    </form>
  );
};

export default WriteDate;
