import CalendarTabs from '@/components/features/date-calendar/calendar-tabs';
import { TEST_COUPLE_ID, TEST_START_DATE } from '@/constants/holiday.constants';

const page = () => {
  return <CalendarTabs coupleId={TEST_COUPLE_ID} startDate={TEST_START_DATE} />;
};

export default page;
