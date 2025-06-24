'use client';

import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import AnalysisButton from './date/analysis-button';
import DateAnalysis from './date/date-analysis';
import dummyData from '@/lib/utils/dummy.utils';
import CalendarCard from './date/calendar-card';
import { ExtendedPost, Holiday } from '@/types/calendar.type';

type DateTabProps = {
  coupleId: string;
};

const DateTab = ({ coupleId }: DateTabProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

  const couple = dummyData.couples.find((c) => c.id === coupleId);
  if (!couple) {
    console.log(`Couple not found in DateTab for coupleId: ${coupleId}`);
  }

  const postsWithImages: ExtendedPost[] = dummyData.posts
    .filter((post) => {
      const isMatch =
        couple && [couple.userAId, couple.userBId].includes(post.userId);
      if (!isMatch) {
        console.log(`Post filtered out: ${post.id}, userId: ${post.userId}`);
      }
      return isMatch;
    })
    .map((post) => {
      const representativeImage = dummyData.postImages.find(
        (img) => img.postId === post.id && img.isRepresentative,
      );
      const likesCount = dummyData.likes.filter(
        (like) => like.postId === post.id,
      ).length;
      const images = dummyData.postImages.filter(
        (img) => img.postId === post.id,
      );
      const tags = dummyData.postTags.filter((tag) => tag.postId === post.id);
      return {
        ...post,
        user_id: post.userId,
        createdAt: post.createdAt.toISOString(),
        deletedAt: post.deletedAt?.toISOString() || null,
        imageUrl: representativeImage?.imageUrl,
        likesCount,
        images,
        tags,
      };
    });

  // 디버깅: 필터링된 포스트 및 커플 정보
  console.log(`Couple for coupleId: ${coupleId}`, couple);
  console.log(`Filtered posts for coupleId: ${coupleId}`, postsWithImages);

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
