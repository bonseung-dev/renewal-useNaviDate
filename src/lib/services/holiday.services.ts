import { CALENDAR_ID, LEGAL_HOLIDAYS } from '@/constants/holiday.constants';
import { HolidayEvent } from '@/types/calendar.type';
import dayjs from 'dayjs';

export const getHolidaysByMonth = async (year: number, month: number) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

  const timeMin = dayjs(`${year}-${month}-01`).startOf('month').toISOString();
  const timeMax = dayjs(`${year}-${month}-01`).endOf('month').toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID,
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || '공휴일 가져오기 실패');

  // 같은 날에 여러 공휴일이 있는 경우를 처리 (예: 2025년 5월 5일 - 어린이날 + 부처님오신날)
  const groupedByDate: Record<
    string,
    { summaries: string[]; isLegalHoliday: boolean }
  > = {};

  for (const event of data.items as HolidayEvent[]) {
    const date = event.start.date;
    const summary = event.summary;

    const isLegal =
      summary !== '크리스마스 이브' &&
      LEGAL_HOLIDAYS.some((holiday) => summary.includes(holiday));

    if (!groupedByDate[date]) {
      groupedByDate[date] = {
        summaries: [summary],
        isLegalHoliday: isLegal,
      };
    } else {
      groupedByDate[date].summaries.push(summary);
      // 둘 중 하나라도 법정 공휴일이면 true
      groupedByDate[date].isLegalHoliday =
        groupedByDate[date].isLegalHoliday || isLegal;
    }
  }

  // 배열로 변환
  return Object.entries(groupedByDate).map(([date, info]) => ({
    date,
    summary: info.summaries.join(' / '),
    isLegalHoliday: info.isLegalHoliday,
  }));
};
