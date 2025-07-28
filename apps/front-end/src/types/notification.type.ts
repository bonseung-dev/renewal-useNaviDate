export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

export type NotificationType = 'like' | 'event' | 'anniversary';
