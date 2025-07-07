import { useMutation } from '@tanstack/react-query';
import { LoginFormData } from '@/lib/zod/auth.schema';
import {
  fetchCouple,
  loginUser,
  setServerCookies,
} from '@/lib/services/auth.services';
import { AUTH_ERRORS } from '@/constants/auth.constants';
import { User } from '@/types/user.type';
import { Couple } from '@/types/couple.type';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      loginUser(email, password),
    onSuccess: async (user: User) => {
      try {
        const couple: Couple | null = await fetchCouple(user.id);

        // 로컬 스토리지 저장 (number → string 변환)
        localStorage.setItem('userId', user.id.toString());
        if (couple) {
          localStorage.setItem('coupleId', couple.id.toString());
          localStorage.setItem('anniversary', couple.anniversary);
        }

        // 서버 쿠키 설정
        await setServerCookies({
          userId: user.id,
          coupleId: couple?.id,
          anniversary: couple?.anniversary,
        });

        // 페이지 리다이렉트
        window.location.href = `/date-calendar/${couple?.id}?userId=${user.id}`;
      } catch (error) {
        console.error('Login Error:', error);
        throw new Error(
          error instanceof Error ? error.message : AUTH_ERRORS.LOGIN_FAILED,
        );
      }
    },
    onError: (error: Error) => {
      throw new Error(error.message || AUTH_ERRORS.LOGIN_FAILED);
    },
  });
};
