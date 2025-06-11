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
  // 백엔드 연동 시 수정 - 환경 변수는 constants/env.constant.ts에서 상수로 가져오기
  // 예: import ENV from '@/constants/env.constant'; const apiKey = ENV.GOOGLE_CALENDAR_API_KEY;
  // 수정할 부분: process.env 직접 사용은 코드 컨벤션 위반 가능성, 상수화 할 예정
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;

  const timeMin = dayjs(`${year}-${month}-01`).startOf('month').toISOString();
  const timeMax = dayjs(`${year}-${month}-01`).endOf('month').toISOString();

  // 백엔드 연동 시 수정 - Google Calendar API URL을 백엔드 API 엔드포인트로 변경
  // 예: const url = `https://your-backend-api.com/holidays?year=${year}&month=${month}`;
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    CALENDAR_ID,
  )}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;

  // 백엔드 연동 시 수정 - 백엔드 API 호출 시 인증 헤더 추가 가능성
  // 예: headers: { Authorization: `Bearer ${token}` }
  const res = await fetch(url);
  const data = await res.json();

  // 백엔드 연동 시 수정 - 백엔드 API의 에러 응답 구조에 맞게 에러 처리 조정
  // 예: if (data.status === 'error') throw new Error(data.message);
  if (!res.ok) throw new Error(data.error?.message || '공휴일 가져오기 실패');

  // 백엔드 연동 시 수정 - 백엔드 API 응답이 BackendHoliday[] 형식이므로 데이터 가공 로직 제거
  // 수정할 부분: 현재 Promise<Holiday[]> 반환 타입은 백엔드 연동 시 Promise<BackendHoliday[]>로 변경
  // 백엔드 응답 예: [{ date: '2025-05-05', items: [{ name: '어린이날', type: '법정공휴일', meta?: {...} }, ...] }]
  const groupedByDate: Record<
    string,
    { summaries: string[]; isLegalHoliday: boolean }
  > = {};

  // 백엔드 연동 시 수정 - 법정 공휴일 판단 로직은 백엔드에서 처리, 이 로직 제거
  // 수정할 부분: LEGAL_HOLIDAYS 기반 문자열 파싱은 불안정, 백엔드에서 type 필드로 제공
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

  // 백엔드 연동 시 수정 - 백엔드 API가 BackendHoliday[] 형식을 반환하면 이 변환 로직 제거
  // 현재: Google Calendar API 응답을 Holiday[]로 변환
  return Object.entries(groupedByDate).map(([date, info]) => ({
    date,
    summary: info.summaries.join(' / '),
    isLegalHoliday: info.isLegalHoliday,
  }));
};
