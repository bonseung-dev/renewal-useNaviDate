'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import type { Holiday, CalendarPost } from '@use-navi-date/shared';
import CalendarCard from './date/calendar-card';
import AnalysisButton from './date/analysis-button';
import DateAnalysis from './date/date-analysis';

const dummyPosts: CalendarPost[] = [
  {
    id: '1',
    userId: 'user1',
    title: '룰루랄라 데이트~ 제목입니다',
    content: '내용1',
    visibility: 'public',
    date: '2025-06-05',
    emotion: 'Joy',
    createdAt: '',
    deletedAt: null,
    images: [],
  },
  {
    id: '2',
    userId: 'user1',
    title: '데이트2',
    content: '내용2',
    visibility: 'public',
    date: '2025-06-15',
    emotion: 'Sad',
    createdAt: '',
    deletedAt: null,
    images: [],
  },
];

const DateTab = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

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

  return (
    <div className="w-full flex flex-col items-center">
      {!isAnalysisView ? (
        <>
          <CalendarCard
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            holidays={holidays}
            posts={dummyPosts}
          />
          <AnalysisButton onClick={() => setIsAnalysisView(true)} />
        </>
      ) : (
        <DateAnalysis onBack={() => setIsAnalysisView(false)} />
      )}
    </div>
  );
};

export default DateTab;
