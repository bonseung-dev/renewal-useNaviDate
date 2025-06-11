import { CALENDAR_ID, LEGAL_HOLIDAYS } from '@/constants/holiday.constants';
import type { Holiday, HolidayEvent } from '@/types/calendar.type'; // HolidayEvent는 타입 단언에 사용됨 (TS6385는 무시해도 됨)
import dayjs from 'dayjs';

/**
 * Google Calendar API로부터 특정 연/월의 공휴일 정보를 가져오는 함수
 * @param year 연도 (예: 2025)
 * @param month 월 (1~12)
 * @returns Holiday[] 형태의 공휴일 목록
 * @note 백엔드 API 연동시 내부 로직을 교체 예정
 */
export const getHolidaysByMonth = async (
  year: number,
  month: number,
): Promise<Holiday[]> => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const timeMin = dayjs(`${year}-${month}-01`).startOf('month').toISOString();
  const timeMax = dayjs(`${year}-${month}-01`).endOf('month').toISOString();

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID,
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || '공휴일 가져오기 실패');

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
      groupedByDate[date].isLegalHoliday =
        groupedByDate[date].isLegalHoliday || isLegal;
    }
  }

  return Object.entries(groupedByDate).map(([date, info]) => ({
    date,
    summary: info.summaries.join(' / '),
    isLegalHoliday: info.isLegalHoliday,
  }));
};
