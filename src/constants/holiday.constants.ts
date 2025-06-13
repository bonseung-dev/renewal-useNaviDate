// 백엔드 연동 시 수정 - 백엔드 API에서 공휴일 데이터를 정제하여 제공하면 이 상수 삭제 가능
export const CALENDAR_ID = 'ko.south_korea#holiday@group.v.calendar.google.com';

// 백엔드 연동 시 수정 - 법정 공휴일 목록은 백엔드에서 처리하므로 이 상수 삭제 가능
export const LEGAL_HOLIDAYS = [
  '새해첫날',
  '설날',
  '추석',
  '삼일절',
  '광복절',
  '개천절',
  '한글날',
  '크리스마스',
  '부처님오신날',
  '어린이날',
  '대체공휴일',
  '대통령 선거',
];

export const REPEAT_OPTIONS = {
  NONE: '없음',
  YEARLY: '매년',
  DAILY: '매일',
  HUNDRED_DAYS: '100일 단위',
} as const;

export const REPEAT_OPTION_LIST = [
  { value: 'NONE', label: '없음' },
  { value: 'YEARLY', label: '매년' },
  { value: 'DAILY', label: '매일' },
  { value: 'HUNDRED_DAYS', label: '100일 단위' },
] as const;
