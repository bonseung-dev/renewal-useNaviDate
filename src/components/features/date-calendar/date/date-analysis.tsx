'use client';

import dayjs from 'dayjs';
import FrequentPlaces from './frequent-places';
import { CalendarHeart, Smile, ThumbsUp } from 'lucide-react';

type Props = {
  onBack: () => void;
};

const DateAnalysis = ({ onBack }: Props) => {
  return (
    <article className="w-[280px] bg-skin5">
      {/* 상단 헤더 */}
      <header className="flex justify-between items-center mb-[24px]">
        <h2 className="text-b-h0 text-skin1 font-bold">데이트 분석</h2>
        <time
          dateTime={dayjs().format('YYYY-MM-DD')}
          className="text-m-h4 text-font4"
        >
          {dayjs().format('YYYY.MM.DD')} 기준
        </time>
      </header>

      <section className="space-y-[12px]">
        {/* 자주 간 장소 영역*/}
        <FrequentPlaces />

        {/* 취향/기분 카드 */}
        <section className="flex justify-between gap-[12px]">
          {/* 내 취향 도넛 차트 */}
          <article className="w-[134px] h-[124px] bg-font5 rounded relative p-[8px]">
            <div className="flex items-center mb-[6px]">
              <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-font4" />
              </div>
              <span className="ml-[8px] text-m-h4 font-semibold text-font1">
                내 취향
              </span>
            </div>
            {/* 도넛 차트 (임시) */}
            <div className="flex justify-center items-center mt-[4px]">
              <div className="w-[64px] h-[64px] rounded-full border-[10px] border-skin1 border-t-transparent" />
            </div>
          </article>

          {/* 내 기분 도넛 차트 */}
          <article className="w-[134px] h-[124px] bg-font5 rounded relative p-[8px]">
            <div className="flex items-center mb-[6px]">
              <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center">
                <Smile className="w-5 h-5 text-font4" />
              </div>
              <span className="ml-[8px] text-m-h4 font-semibold text-font1">
                내 기분
              </span>
            </div>
            {/* 도넛 차트 (임시) */}
            <div className="flex justify-center items-center mt-[4px]">
              <div className="w-[64px] h-[64px] rounded-full border-[10px] border-skin1 border-t-transparent" />
            </div>
          </article>
        </section>

        {/* 월별 데이트 횟수 차트 */}
        <section className="w-[280px] h-[124px] bg-skin6 rounded p-4 mt-[12px]">
          <div className="flex items-center mb-2">
            <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center mr-2">
              <CalendarHeart className="w-[20px] h-[20px] text-skin6" />
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
        </section>
      </section>

      {/* 돌아가기 버튼 */}
      <footer>
        <button
          onClick={onBack}
          className="mt-4 w-full text-center text-m-h4 text-skin1 underline"
        >
          돌아가기
        </button>
      </footer>
    </article>
  );
};

export default DateAnalysis;
