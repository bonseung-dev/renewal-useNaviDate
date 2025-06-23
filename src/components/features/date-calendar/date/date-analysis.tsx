'use client';

import dayjs from 'dayjs';
import FrequentPlaces from './frequent-places';
import Image from 'next/image';

type Props = {
  onBack: () => void;
};

const DateAnalysis = ({ onBack }: Props) => {
  return (
    <div className="w-[280px] bg-skin5">
      {/* 상단 헤더 */}
      <div className="flex justify-between items-center mb-[24px]">
        <h2 className="text-b-h0 text-skin1 font-bold">데이트 분석</h2>
        <span className="text-m-h4 text-font4">
          {dayjs().format('YYYY.MM.DD')} 기준
        </span>
      </div>

      <div className="space-y-[12px]">
        {/* 자주 간 장소 영역*/}
        <FrequentPlaces />
        {/* 취향/기분 카드 */}
        <div className="flex justify-between gap-[12px]">
          {/* 내 취향 도넛 차트 실제 데이터로 교체 예정 */}
          <div className="w-[134px] h-[124px] bg-font5 rounded relative p-[8px]">
            <div className="flex items-center mb-[6px]">
              <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center">
                <Image
                  src="/Group 269.png"
                  alt="내 취향 아이콘"
                  width={14}
                  height={17}
                />
              </div>
              <span className="ml-[8px] text-m-h4 font-semibold text-font1">
                내 취향
              </span>
            </div>
            {/* 도넛 차트 (임시) */}
            <div className="flex justify-center items-center mt-[4px]">
              <div className="w-[64px] h-[64px] rounded-full border-[10px] border-skin1 border-t-transparent" />
            </div>
          </div>

          {/* 내 기분 도넛 차트 실제 데이터로 교체 예정 */}
          <div className="w-[134px] h-[124px] bg-font5 rounded relative p-[8px]">
            <div className="flex items-center mb-[6px]">
              <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center">
                <Image
                  src="/emotions/emotion_usual.png"
                  alt="내 기분 아이콘"
                  width={14}
                  height={17}
                />
              </div>
              <span className="ml-[8px] text-m-h4 font-semibold text-font1">
                내 기분
              </span>
            </div>
            {/* 도넛 차트 (임시) */}
            <div className="flex justify-center items-center mt-[4px]">
              <div className="w-[64px] h-[64px] rounded-full border-[10px] border-skin1 border-t-transparent" />
            </div>
          </div>
        </div>

        {/* 월별 데이트 횟수 차트 실제 데이터 연동 예정 */}
        <div className="w-[280px] h-[124px] bg-skin6 rounded p-4 mt-[12px]">
          <div className="flex items-center mb-2">
            <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center mr-2">
              <Image
                src="/Group 269.png"
                alt="달력 아이콘"
                width={14}
                height={17}
              />
            </div>
            <p className="text-b-h4 font-bold text-font1">월별 데이트 횟수</p>
          </div>
          <div className="ml-[44px]">
            <div className="flex gap-[10px] h-[48px] w-[204px]">
              {Array.from({ length: 12 }).map((_, i) => {
                const percent = Math.floor(Math.random() * 100);
                const filledHeight = Math.round((percent / 100) * 48);

                return (
                  <div
                    key={i}
                    className="w-[8px] h-[48px] bg-skin5 rounded-[12px] flex flex-col justify-end overflow-hidden"
                  >
                    {percent > 0 && (
                      <div
                        className="w-full bg-skin1"
                        style={{ height: `${filledHeight}px` }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 돌아가기 버튼 */}
      <button
        onClick={onBack}
        className="mt-4 w-full text-center text-m-h4 text-skin1 underline"
      >
        돌아가기
      </button>
    </div>
  );
};

export default DateAnalysis;
