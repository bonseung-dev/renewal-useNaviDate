export type Notification = {
  id: string;
  userId: string;
  type: 'like' | 'event' | 'anniversary';
  message: string;
  isRead: boolean;
  createdAt: Date;
};
