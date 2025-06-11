import { CALENDAR_ID, LEGAL_HOLIDAYS } from '@/constants/holiday.constants';
import { HolidayEvent } from '@/types/calendar.type';
import dayjs from 'dayjs';

export const getHolidaysByMonth = async (year: number, month: number) => {
  // 백엔드 연동시 수정 - Google API 대신 백엔드 API 호출로 변경
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

  const timeMin = dayjs(`${year}-${month}-01`).startOf('month').toISOString();
  const timeMax = dayjs(`${year}-${month}-01`).endOf('month').toISOString();

  // 백엔드 연동시 수정 - 아래 URL을 백엔드 엔드포인트로 변경
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID,
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error(data.error?.message || '공휴일 가져오기 실패');

  // 백엔드 연동시 수정 - 백엔드 응답 데이터 구조에 맞게 변환 로직 변경
  /* [예상 백엔드 응답 처리]
  return data.map((item: BackendHolidayResponse) => ({
    date: item.date,
    summary: item.items.map(i => i.name).join(' / '),
    isLegalHoliday: item.items.some(i => i.type === '법정공휴일')
  }));
  */

  // 임시 Google API 처리 (백엔드 연동시 삭제 예정)
  // 같은 날에 여러 공휴일이 있는 경우를 처리 (예: 2025년 5월 5일 - 어린이날 + 부처님오신날)
  const groupedByDate: Record<
    string,
    { summaries: string[]; isLegalHoliday: boolean }
  > = {};

  for (const event of data.items as HolidayEvent[]) {
    const date = event.start.date;
    const summary = event.summary;

    // 백엔드 연동시 수정 - 법정공휴일 판단 로직 제거 (백엔드에서 타입으로 제공)
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
