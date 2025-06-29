// import { Couple, User } from '@/types/community.type';

// // 커플 정보 조회 함수들
// export const findUser = async (userId: string): Promise<User | undefined> => {
//   try {
//     const response = await fetch(`http://localhost:4000/users/${userId}`);
//     if (!response.ok) return undefined;
//     return await response.json();
//   } catch (error) {
//     console.error('사용자 조회 실패:', error);
//     return undefined;
//   }
// };

// export const findCouple = async (
//   coupleId: string,
// ): Promise<Couple | undefined> => {
//   try {
//     const response = await fetch(`http://localhost:4000/couples/${coupleId}`);
//     if (!response.ok) return undefined;
//     return await response.json();
//   } catch (error) {
//     console.error('커플 조회 실패:', error);
//     return undefined;
//   }
// };

// export const findCoupleByUser = async (
//   userId: string,
// ): Promise<Couple | undefined> => {
//   try {
//     const response = await fetch(`http://localhost:4000/couples`);
//     const couples: Couple[] = await response.json();
//     return couples.find((c) => c.userAId === userId || c.userBId === userId);
//   } catch (error) {
//     console.error('사용자 커플 조회 실패:', error);
//     return undefined;
//   }
// };
