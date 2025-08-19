import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import AnalysisButton from './date/analysis-button';
import DateAnalysis from './date/date-analysis';
import { fetchPostsByCouple } from '@/lib/services/calendar.services';
import CalendarCard from './date/calendar/calendar-card';
import { CalendarPost, Holiday } from '@use-navi-date/shared';

type DateTabProps = {
  coupleId: number;
  token: string;
};

const DateTab = ({ coupleId, token }: DateTabProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [postsWithImages, setPostsWithImages] = useState<CalendarPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [holidaysData, postsData] = await Promise.all([
          getHolidaysByMonth(currentDate.year(), currentDate.month() + 1),
          fetchPostsByCouple(coupleId, token),
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
  }, [coupleId, currentDate, token]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 예시: 1.5초 후 로딩 완료
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full py-4 flex flex-low items-center justify-center gap-1">
        {['L', 'o', 'a', 'd', 'i', 'n', 'g'].map((char, idx) => (
          <span
            key={idx}
            className="inline-block text-skin1 text-lg font-bold animate-bounce"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  // console.log('이미지', postsWithImages);

  return (
    <div className="w-full flex flex-col items-center">
      {!isAnalysisView ? (
        <section aria-labelledby="date-calendar-section">
          <h2 id="date-calendar-section" className="sr-only">
            데이트 캘린더
          </h2>
          <CalendarCard
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            holidays={holidays}
            posts={postsWithImages}
          />
          <AnalysisButton onClick={() => setIsAnalysisView(true)} />
        </section>
      ) : (
        <section aria-labelledby="date-analysis-section">
          <h2 id="date-analysis-section" className="sr-only">
            데이트 분석
          </h2>
          <DateAnalysis onBack={() => setIsAnalysisView(false)} />
        </section>
      )}
    </div>
  );
};

export default DateTab;
