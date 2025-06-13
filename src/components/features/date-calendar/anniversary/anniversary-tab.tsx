'use client';

import { useEffect, useState } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import { getAnniversaries } from '@/lib/hooks/use-anniversaries';
import AnniversaryForm from './anniversary-form';
import AnniversaryList from './anniversary-list';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AnniversaryTab = () => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [repeat, setRepeat] = useState(false);
  const [open, setOpen] = useState(false); // 모달 열기 상태 제어

  useEffect(() => {
    const coupleId = 'sample-couple-id';
    const startDate = '2025-06-01';
    const data = getAnniversaries(coupleId, startDate);
    setAnniversaries(data);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <span className="font-semibold text-sm text-white">
              짱구 ❤️ 수지
            </span>
          </div>

          {/* 모달 여는 버튼 (트리거) */}
          <DialogTrigger asChild>
            <button className="text-xs bg-[#7BB4DD] border border-white hover:bg-white hover:text-[#7BB4DD] px-3 py-1 rounded-full text-white font-medium">
              기념일 추가
            </button>
          </DialogTrigger>
        </div>

        {/* 기념일 리스트 */}
        <AnniversaryList anniversaries={anniversaries} />
      </div>

      {/* 모달은 최상단 위치에서 렌더됨 */}
      <DialogContent className="bg-white p-0 border-none shadow-lg rounded-xl w-[90vw] max-w-md">
        <DialogTitle className="sr-only">기념일 추가</DialogTitle>
        <DialogDescription className="sr-only">
          기념일 정보를 입력해 주세요.
        </DialogDescription>
        <AnniversaryForm repeat={repeat} onRepeatChange={setRepeat} />
      </DialogContent>
    </Dialog>
  );
};

export default AnniversaryTab;
