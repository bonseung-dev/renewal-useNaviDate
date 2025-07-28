export type Notification = {
  id: number;
  userId: number;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export type NotificationType = 'like' | 'event' | 'anniversary';
