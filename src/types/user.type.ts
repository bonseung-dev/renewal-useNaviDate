export type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  createdAt: string;
  tempToken?: string;
};
