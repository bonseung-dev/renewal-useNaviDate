'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import type { Holiday } from '@/types/calendar.type';

// TODO: 백엔드 holiday 연동 시 Holiday[] → BackendHoliday[] 타입으로 교체 예정
// holiday.items[].type === '법정공휴일' 여부로 법정/사용자 기념일 판단

// 임시 Post 타입 정의 - 백엔드 연동 전용 타입으로 추후 교체
// TODO: post.type.ts 생성 후 실제 타입 정의 반영 예정

type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

type Post = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
  imageUrl?: string;
  created_at: string;
  deleted_at: string | null;
};

// 감정별 이미지 매핑
const emotionImages: Record<Emotion, string> = {
  Joy: '/emotions/emotion_happy.png',
  Fun: '/emotions/emotion_excited.png',
  Soso: '/emotions/emotion_usual.png',
  Sad: '/emotions/emotion_sad.png',
  Mad: '/emotions/emotion_angry.png',
};

// 테스트용 임시 post 데이터 - 실제 query 연동 시 제거 예정
const dummyPosts: Post[] = [
  {
    id: '1',
    user_id: 'user1',
    title: '룰루랄라 데이트~ 제목입니다',
    content: '내용1',
    visibility: 'public',
    date: '2025-06-05',
    emotion: 'Joy',
    created_at: '',
    deleted_at: null,
  },
  {
    id: '2',
    user_id: 'user1',
    title: '데이트2',
    content: '내용2',
    visibility: 'public',
    date: '2025-06-15',
    emotion: 'Sad',
    created_at: '',
    deleted_at: null,
  },
];

const DateTab = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.year();
      const month = currentDate.month() + 1;
      try {
        const data = await getHolidaysByMonth(year, month);
        setHolidays(data);
      } catch (err) {
        console.error('공휴일 로딩 실패', err);
      }
    };
    loadHolidays();
  }, [currentDate]);

  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handleDateClick = (day: number) => {
    const selected = dayjs(
      `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
    ).format('YYYY-MM-DD');
    console.log('Selected:', selected);
  };

  const getPostForDate = (dateStr: string) =>
    dummyPosts.find((post) => dayjs(post.date).isSame(dateStr, 'day'));
  const getHolidayForDate = (dateStr: string) =>
    holidays.find((h) => dayjs(h.date).isSame(dateStr, 'day'));

  return (
    <div className="w-full flex flex-col items-center">
      {!isAnalysisView ? (
        <>
          {/* 캘린더 카드 */}
          <div className="relative w-[280px] h-[320px] rounded-[20px] shadow-shadow1 bg-skin5 p-[32px] pt-[22px] flex flex-col">
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
            <div className="text-left mb-5">
              <span className="text-calendar font-bold text-font3">
                {currentDate.format('MM')}
              </span>
              <span className="text-b-h2 text-font4 ml-1">
                | {currentDate.format('YYYY')}
              </span>
            </div>

            {/* 요일 */}
            <div className="grid grid-cols-7 text-center text-b-h3 text-font2 font-bold mb-5">
              {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                <div
                  key={i}
                  className={
                    i === 0 ? 'text-skin7' : i === 6 ? 'text-skin1' : ''
                  }
                >
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
                const isCustomHoliday = holiday && !isLegalHoliday;

                const textColor = isToday
                  ? 'text-skin5'
                  : isLegalHoliday
                    ? 'text-skin7'
                    : isCustomHoliday
                      ? 'text-skin6'
                      : idx % 7 === 0
                        ? 'text-skin7'
                        : idx % 7 === 6
                          ? 'text-skin1'
                          : 'text-font2';

                const bgColor = isToday ? 'bg-skin1' : '';

                return (
                  <div
                    key={idx}
                    onClick={() => day && handleDateClick(day)}
                    className={`relative mx-auto w-8 h-8 group ${post || holiday ? 'cursor-pointer' : ''}`}
                  >
                    {(post || holiday) && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 text-l-title5 bg-skin2 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md before:content-[''] before:absolute before:-top-1 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:bg-skin2 before:rotate-45 before:z-10">
                        {holiday?.summary || post?.title}
                      </div>
                    )}
                    <div
                      className={`absolute inset-0 rounded-full transition ${bgColor} hover:bg-font5`}
                    ></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                      {post ? (
                        <Image
                          src={post.imageUrl || emotionImages[post.emotion]}
                          alt="대표 이미지"
                          width={32}
                          height={32}
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <span className={`${textColor} font-medium`}>
                          {day}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 분석 버튼 */}
          <button
            onClick={() => setIsAnalysisView(true)}
            className="mt-6 w-[280px] h-[80px] rounded-[20px] bg-skin6 flex items-center px-4"
          >
            <Image
              src="/Frame.png"
              alt="분석 아이콘"
              width={40}
              height={40}
              className="mr-3"
            />
            <div className="flex flex-col justify-center items-start">
              <span className="text-b-h3 font-bold text-font3">
                데이트 분석
              </span>
              <span className="text-m-h4 text-font3">
                우리 둘만의 데이트 분석 리포트
              </span>
            </div>
          </button>
        </>
      ) : (
        <div className="w-[280px] min-h-[320px] p-4 rounded-[20px] bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-b-h0 text-skin1 font-bold">데이트 분석</h2>
            <span className="text-m-h4 text-font4">
              {dayjs().format('YYYY.MM.DD')} 기준
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-m-h4 font-semibold text-font2 mb-1">
                📍 자주 간 장소 TOP 5
              </p>
              <div className="space-y-1">
                <div className="w-2/3 h-2 bg-skin1 rounded" />
                <div className="w-1/2 h-2 bg-skin1 rounded" />
                <div className="w-3/5 h-2 bg-skin1 rounded" />
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 h-[80px] rounded bg-gray-100 flex items-center justify-center">
                내 취향
              </div>
              <div className="flex-1 h-[80px] rounded bg-gray-200 flex items-center justify-center">
                내 기분
              </div>
            </div>
            <div className="rounded bg-skin6 p-4">
              <p className="text-b-h4 font-bold mb-2">📅 월별 데이트 횟수</p>
              <div className="flex items-end justify-between h-[60px]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 rounded bg-skin1"
                    style={{ height: `${20 + Math.random() * 40}px` }}
                  ></div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setIsAnalysisView(false)}
              className="mt-4 w-full text-center text-m-h4 text-skin1 underline"
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTab;
