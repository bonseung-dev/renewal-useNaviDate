import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';

// 테스트용 상수 (개발 환경에서만 사용)
const TEST_COUPLE_ID = '1';
const TEST_START_DATE = '2024-01-01';
const TEST_USER_ID = '1';

const page = () => {
  return <CalendarTabs coupleId={TEST_COUPLE_ID} startDate={TEST_START_DATE} userId={TEST_USER_ID} />;
};

export default page;
