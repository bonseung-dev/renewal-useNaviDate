export type Setting = {
  id: string;
  userId: string;
  theme: 'light' | 'dark';
  allowPush: boolean;
  createdAt: Date;
};
