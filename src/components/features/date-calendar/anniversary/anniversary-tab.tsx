'use client';

import { useEffect, useState } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import { getAnniversaries } from '@/lib/hooks/use-anniversaries';
import AnniversaryForm from './anniversary-form';
import AnniversaryList from './anniversary-list';
import Image from 'next/image';

const AnniversaryTab = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    const coupleId = 'sample-couple-id';
    const startDate = '2025-06-01'; // 연애 시작일 (테스트용)
    const data = getAnniversaries(coupleId, startDate);
    setAnniversaries(data);
  }, []);

  const handleAddClick = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  return (
    <div className="flex items-center justify-center flex-col">
      {/* 상단: 커플 정보 */}
      <div className="w-[320px] h-[52px] flex items-center justify-between bg-[#7BB4DD] rounded-[40px] px-4">
        <div className="flex items-center gap-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Og0eTxPdFSH4GjaCkkbiqyeAjlLkafGbqA&s"
            alt="커플 이미지"
            width={32}
            height={32}
            className="h-auto w-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-white">짱구 ❤️ 수지</span>
        </div>
        <button
          onClick={handleAddClick}
          className="text-xs bg-[#7BB4DD] border border-white hover:bg-white hover:text-[#7BB4DD] px-3 py-1 rounded-full text-white font-medium"
        >
          기념일 추가
        </button>
      </div>

      {/* 리스트 또는 폼 표시 */}
      {showForm ? (
        <AnniversaryForm
          repeat={repeat}
          onRepeatChange={setRepeat}
          onCancel={handleCancel}
        />
      ) : (
        <AnniversaryList anniversaries={anniversaries} />
      )}
    </div>
  );
};

export default AnniversaryTab;
