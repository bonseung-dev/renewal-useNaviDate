'use client';

import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Emotion, ExtendedPost, Holiday } from '@/types/calendar.type';
import { WEEKDAYS } from '@/constants/calendar.constants';
import { EMOTION_IMAGES } from '@/constants/emotions.constants';
import Tooltip from '@/components/ui/tooltip';

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
      <div className="text-left mb-3 flex items-baseline">
        <span className="text-calendar font-bold text-font3">
          {currentDate.format('MM')}
        </span>
        <div className="mx-3 h-[26px] w-[1px] bg-font3"></div>
        <span className="text-b-h2 font-bold text-font4">
          {currentDate.format('YYYY')}
        </span>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 text-center text-b-h3 text-font2 font-bold mb-1.5">
        {WEEKDAYS.map((d, i) => (
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
                    <Tooltip content={post.title} position="bottom">
                      <div className="relative aspect-square w-full overflow-hidden rounded-full">
                        <Image
                          src={
                            post.imageUrl ||
                            EMOTION_IMAGES[post.emotion as Emotion]
                          }
                          alt="대표 이미지"
                          width={32}
                          height={32}
                          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover hover:opacity-90"
                        />
                      </div>
                    </Tooltip>
                  </div>
                ) : (
                  <span className={`${textColor} text-l-title4 font-light`}>
                    {day}
                  </span>
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
