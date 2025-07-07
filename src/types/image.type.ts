export type Image = {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  url: string;
  userId?: number;
  createdAt: Date;
  updatedAt: Date;
};
