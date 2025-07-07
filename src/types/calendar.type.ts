export type HolidayEvent = {
  start: {
    date: string; // YYYY-MM-DD
  };
  summary: string; // 공휴일 이름
};

export type Holiday = {
  date: string;
  summary: string;
  isLegalHoliday: boolean;
};
