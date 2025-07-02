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

// 백엔드 연동 시 수정 - meta 필드는 백엔드 API 스펙에 따라 유지 또는 제거
// 예: meta가 필요 없으면 BackendHolidayItem에서 meta 필드 삭제
// 예: meta 구조가 명확하면 Record<string, unknown>을 구체적 타입(예: { description: string })으로 변경
/**
 * 백엔드 연동 시 사용할 공휴일 항목 타입
 * @description meta 필드는 선택적으로 포함, 백엔드 스펙에 따라 조정 가능
 */
export type BackendHolidayItem = {
  name: string;
  type: '법정공휴일' | '기념일' | '대체공휴일';
  meta?: Record<string, unknown>;
};

// 일담 임시로 calendar에 타입을 지정했으나 종연님이 해주시면 교체할 예정
export type Emotion = 'Joy' | 'Fun' | 'Soso' | 'Sad' | 'Mad';

export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  visibility: 'private' | 'public';
  date: string;
  emotion: Emotion;
  imageUrl?: string;
  createdAt: string;
  deletedAt: string | null;
};
