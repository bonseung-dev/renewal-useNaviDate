export type Setting = {
  id: number;
  userId: number;
  theme: boolean; // true: 라이트 모드, false: 다크 모드, default: 라이트 모드
  allowPush: boolean;
  createdAt: Date;
};
