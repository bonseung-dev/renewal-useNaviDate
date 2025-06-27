'use client';

import { useEffect, useState, useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import AnalysisButton from './date/analysis-button';
import DateAnalysis from './date/date-analysis';
import dummyData from '@/lib/utils/dummy.utils';
import CalendarCard from './date/calendar-card';
import { Holiday } from '@/types/calendar.type';

type DateTabProps = {
  coupleId: string;
};

const DateTab = ({ coupleId }: DateTabProps) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [isAnalysisView, setIsAnalysisView] = useState(false);

  /**
   * 더미 데이터를 사용한 임시 데이터 처리
   * 백엔드 연동시 아래 사항 변경 필요:
   * 1. API 호출로 데이터 fetching
   * 2. 데이터 가공 로직 분리 (custom hook 또는 서비스 레이어로)
   * 3. 에러 처리 강화
   * 4. 로딩 상태 추가
   */
  const { postsWithImages } = useMemo(() => {
    // 임시 커플 데이터 조회 (API 호출로 대체 예정)
    const couple = dummyData.couples.find((c) => c.id === coupleId);
    if (!couple) {
      console.warn(
        `DateTab에서 coupleId에 해당하는 커플을 찾을 수 없음: ${coupleId}`,
      );
      return { postsWithImages: [] };
    }

    // 커플 구성원 ID로 필터링
    const coupleUserIds = new Set([couple.userAId, couple.userBId]);
    const filteredPosts = dummyData.posts.filter((post) =>
      coupleUserIds.has(post.userId),
    );

    // 포스트 데이터 가공 (백엔드 연동시 필요에 따라 구조 변경)
    const processedPosts = filteredPosts.map((post) => {
      // 대표 이미지 찾기
      const representativeImage = dummyData.postImages.find(
        (img) => img.postId === post.id && img.isRepresentative,
      );

      // 연관 데이터 계산 (백엔드에서 함께 넘겨주면 불필요한 필터링 제거 가능)
      const likesCount = dummyData.likes.filter(
        (like) => like.postId === post.id,
      ).length;
      const images = dummyData.postImages.filter(
        (img) => img.postId === post.id,
      );
      const tags = dummyData.postTags.filter((tag) => tag.postId === post.id);
      const bookmarksCount = dummyData.bookmarks.filter(
        (bookmark) => bookmark.postId === post.id,
      ).length;

      return {
        ...post,
        user_id: post.userId,
        createdAt: post.createdAt.toISOString(),
        deletedAt: post.deletedAt?.toISOString() || null,
        imageUrl: representativeImage?.imageUrl,
        likesCount,
        bookmarksCount,
        images,
        tags,
      };
    });

    // 개발용 로그 (추후 제거예정)
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DateTab] 데이터 로드 완료`, {
        coupleId,
        postCount: processedPosts.length,
      });
    }

    return { postsWithImages: processedPosts };
  }, [coupleId]); // 커플 ID 변경시에만 재계산

  /**
   * 공휴일 데이터 로딩
   * 현재는 외부 API 직접 호출 중이지만,
   * 백엔드 연동시에는 백엔드 API 통해 가져오는 방식으로 변경 예정
   */
  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.year();
      const month = currentDate.month() + 1;
      try {
        const data = await getHolidaysByMonth(year, month);
        setHolidays(data);
      } catch (err) {
        console.error('공휴일 정보 로딩 실패', err);
        //  에러 처리 (사용자 알림 등) 추가 예정
      }
    };
    loadHolidays();
  }, [currentDate]);

  return (
    <div className="w-full flex flex-col items-center">
      {!isAnalysisView ? (
        <>
          {/* 캘린더 카드 컴포넌트 - 추후 성능 최적화 예정 */}
          <CalendarCard
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            holidays={holidays}
            posts={postsWithImages}
          />
          {/* 분석 뷰 전환 버튼 */}
          <AnalysisButton onClick={() => setIsAnalysisView(true)} />
        </>
      ) : (
        // 분석 뷰 컴포넌트 (추가 개발 필요)
        <DateAnalysis onBack={() => setIsAnalysisView(false)} />
      )}
    </div>
  );
};

export default DateTab;
