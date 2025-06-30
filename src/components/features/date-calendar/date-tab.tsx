'use client';

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import AnalysisButton from './date/analysis-button';
import DateAnalysis from './date/date-analysis';
import CalendarCard from './date/calendar-card';
import { ExtendedPost, Holiday } from '@/types/calendar.type';
import { fetchPostsByCouple } from '@/lib/services/calendar.services';

type DateTabProps = {
  coupleId: string;
};

const DateTab = ({ coupleId }: DateTabProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [postsWithImages, setPostsWithImages] = useState<ExtendedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [holidaysData, postsData] = await Promise.all([
          getHolidaysByMonth(currentDate.year(), currentDate.month() + 1),
          fetchPostsByCouple(coupleId),
        ]);
        setHolidays(holidaysData);
        setPostsWithImages(postsData);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [coupleId, currentDate]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col items-center">
      {!isAnalysisView ? (
        <>
          <CalendarCard
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            holidays={holidays}
            posts={postsWithImages}
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
