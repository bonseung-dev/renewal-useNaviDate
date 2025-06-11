/**
 * [주의] 백엔드 API 연동 후 삭제 예정
 * 현재 Google Calendar API 응답을 가공한 임시 타입
 *
 * @deprecated 백엔드 연동시 `BackendHoliday` 타입으로 대체될 예정
 * @see BackendHoliday
 */
export type Holiday = {
  /** YYYY-MM-DD 형식의 날짜 */
  date: string;
  /**
   * 공휴일 이름 (여러 이벤트가 있을 경우 "이벤트1 / 이벤트2" 형식으로 병합됨)
   * @example "어린이날 / 부처님오신날"
   */
  summary: string;
  /**
   * 프론트엔드에서 `LEGAL_HOLIDAYS` 기준으로 판단한 법정공휴일 여부
   * @warning 백엔드 연동시 `BackendHolidayItem.type`으로 대체
   */
  isLegalHoliday: boolean;
};

/**
 * Google Calendar API 원본 응답 타입
 * @see https://developers.google.com/calendar/api/v3/reference/events
 * @deprecated 백엔드 연동시 더 이상 사용되지 않음
 */
export type HolidayEvent = {
  start: {
    /** ISO 8601 형식의 날짜 (YYYY-MM-DD) */
    date: string;
  };
  /** 공휴일 이름 */
  summary: string; // ex: "어린이날", "추석 연휴"
};

/**
 * 백엔드 API 연동 후 사용할 새로운 공휴일 타입 (임시!!이름!!)
 *
 * @version 1.0.0
 * @description 백엔드에서 제공하는 표준화된 공휴일 데이터 구조
 * @example
 * {
 *   date: "2025-05-05",
 *   items: [
 *     { name: "어린이날", type: "법정공휴일" },
 *     { name: "입양의날", type: "기념일" }
 *   ]
 * }
 */
export type BackendHoliday = {
  /** YYYY-MM-DD 형식의 날짜 */
  date: string;
  /** 해당 날짜의 공휴일/기념일 목록 */
  items: BackendHolidayItem[];
};

/**
 * 개별 공휴일 항목에 대한 상세 정보
 */
export type BackendHolidayItem = {
  /** 공식적인 휴일/기념일 이름 */
  name: string;
  /**
   * 휴일 유형 분류
   * - `법정공휴일`: 근로기준법상 휴일 (ex. 광복절)
   * - `기념일`: 법정 효력 없는 기념일 (ex. 스승의날)
   * - `대체공휴일`: 주말과 겹치는 경우 적용
   */
  type: '법정공휴일' | '기념일' | '대체공휴일';
  /**
   * [옵션] 추가 메타데이터 필요 시 확장 가능
   * @futureFeature 휴일 중요도(priority), 국가별 정보(countryCode) 등
   */
  meta?: Record<string, unknown>;
};

/**
 * 변환 유틸리티 타입 (임시 호환용)
 * @internal 백엔드 연동 과도기에서만 사용
 */
export type HolidayCompat = Holiday | BackendHoliday;
