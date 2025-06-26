'use client';

import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Emotion, ExtendedPost, Holiday } from '@/types/calendar.type';

const emotionImages: Record<Emotion, string> = {
  Joy: '/emotions/emotion_happy.png',
  Fun: '/emotions/emotion_excited.png',
  Soso: '/emotions/emotion_usual.png',
  Sad: '/emotions/emotion_sad.png',
  Mad: '/emotions/emotion_angry.png',
};

type Props = {
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  holidays: Holiday[];
  posts: ExtendedPost[];
};

const CalendarCard = ({
  currentDate,
  setCurrentDate,
  holidays,
  posts,
}: Props) => {
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const handleDateClick = (day: number) => {
    const selected = dayjs(
      `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
    ).format('YYYY-MM-DD');
    console.log('선택된 항목:', selected);
  };

  const getPostForDate = (dateStr: string) => {
    return posts.find((post) => dayjs(post.date).isSame(dateStr, 'day'));
  };

  const getHolidayForDate = (dateStr: string) => {
    return holidays.find((h) => dayjs(h.date).isSame(dateStr, 'day'));
  };

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="relative w-[280px] rounded-[20px] shadow-shadow1 bg-skin5 p-[32px] pt-[22px] flex flex-col">
      {/* 월 이동 */}
      <button
        onClick={handlePrevMonth}
        className="absolute left-[-24px] top-[50%] -translate-y-1/2"
      >
        <ChevronLeft className="w-5 h-5 text-skin2" />
      </button>
      <button
        onClick={handleNextMonth}
        className="absolute right-[-24px] top-[50%] -translate-y-1/2"
      >
        <ChevronRight className="w-5 h-5 text-skin2" />
      </button>

      {/* 헤더 */}
      <div className="text-left mb-3">
        <span className="text-calendar font-bold text-font3">
          {currentDate.format('MM')}
        </span>
        <span className="text-b-h2 text-font4 ml-1">
          | {currentDate.format('YYYY')}
        </span>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center text-b-h3 text-font2 font-bold mb-1.5">
        {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
          <div key={i} className={i === 0 ? 'text-skin7' : ''}>
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center text-m-h4">
        {days.map((day, idx) => {
          const dateStr = day
            ? dayjs(currentDate).date(day).format('YYYY-MM-DD')
            : '';
          const post = day ? getPostForDate(dateStr) : null;
          const holiday = day ? getHolidayForDate(dateStr) : null;
          const isToday = day && dayjs().isSame(dateStr, 'day');

          const isLegalHoliday = holiday?.isLegalHoliday;

          const textColor = isToday
            ? 'text-skin5'
            : isLegalHoliday
              ? 'text-skin7'
              : idx % 7 === 0
                ? 'text-skin7'
                : 'text-font2';

          const bgColor = isToday ? 'bg-skin1' : '';

          return (
            <div
              key={idx}
              onClick={() => day && handleDateClick(day)}
              className={`relative my-1 mx-auto w-[30px] h-[30px] ${post ? 'cursor-pointer' : ''}`}
            >
              <div
                className={`absolute inset-0 rounded-full transition ${bgColor}`}
              />
              <div className="relative w-full h-full flex items-center justify-center">
                {post ? (
                  <div className="relative w-full h-full">
                    <div className="group relative w-full h-full">
                      <Image
                        src={post.imageUrl || emotionImages[post.emotion]}
                        alt="대표 이미지"
                        width={32}
                        height={32}
                        className="rounded-full w-full h-full object-cover hover:opacity-90"
                      />
                      <div className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 px-2 py-1 text-l-title5 bg-skin2 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md pointer-events-none before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-skin2 before:rotate-45">
                        {post.title}
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className={`${textColor} text-l-title4`}>{day}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarCard;
