export type Holiday = {
  date: string;
  summary: string;
  isLegalHoliday: boolean;
};

export type HolidayEvent = {
  start: { date: string }; // 공휴일 날짜 (YYYY-MM-DD 형식)
  summary: string; // 공휴일 이름 (구글 캘린더에 등록된 텍스트)
};
