/**
 * 현재 사용 중인 Google Calendar API 이벤트 응답 타입
 * @deprecated 백엔드 연동시 사용 종료 예정
 */
export type HolidayEvent = {
  start: {
    date: string; // YYYY-MM-DD
  };
  summary: string; // 공휴일 이름
};

/**
 * 프론트에서 가공한 공휴일 정보 타입
 * @description 같은 날에 여러 공휴일이 있으면 summary가 병합됨
 */
export type Holiday = {
  date: string;
  summary: string;
  isLegalHoliday: boolean;
};

/**
 * 백엔드 연동시 사용할 표준 공휴일 타입
 */
export type BackendHoliday = {
  date: string;
  items: BackendHolidayItem[];
};

export type BackendHolidayItem = {
  name: string;
  type: '법정공휴일' | '기념일' | '대체공휴일';
  meta?: Record<string, unknown>;
};
