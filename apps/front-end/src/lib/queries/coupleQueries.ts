import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Couple } from '@/types/couple.type';
import { getClientAuthToken } from '../utils/api';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

/**
 * 커플 데이터 조회
 */
export const useCouple = (coupleId: string | null) => {
  return useQuery<Couple>({
    queryKey: ['couple', coupleId],
    queryFn: async () => {
      if (!coupleId) throw new Error('커플 ID가 없습니다.');

      const token = getClientAuthToken();
      if (!token) throw new Error('인증 토큰이 없습니다.');

      const response = await fetch(`${API_BASE_URL}/couples/${coupleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || '커플 데이터를 가져오지 못했습니다.');
      }

      return data.data;
    },
    enabled: !!coupleId,
    retry: 1,
    staleTime: 0,
  });
};

/**
 * 커플 생성 (초대 링크 생성 시 사용)
 */
export const useCreateCouple = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { userAId: string; anniversary: string }) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await fetch(`${API_BASE_URL}/couples`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAId: data.userAId,
          anniversary: data.anniversary,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `커플 생성에 실패했습니다: ${response.statusText}`,
        );
      }

      return result.data; // Couple 객체 반환
    },
    onSuccess: (data) => {
      alert('초대 링크가 생성되었습니다!');
      if (typeof window !== 'undefined') {
        localStorage.setItem('coupleId', data.id);
      }
      queryClient.invalidateQueries({ queryKey: ['couple', data.id] });
    },
    onError: (error: Error) => {
      alert(error.message || '커플 생성에 실패했어요.');
    },
  });
};

/**
 * 초대 수락 (PATCH 요청)
 */
export const useAcceptCoupleInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { coupleId: string; userBId: string }) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await fetch(`${API_BASE_URL}/couples/${data.coupleId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userBId: data.userBId,
          status: 'confirm',
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `초대 수락에 실패했습니다: ${response.statusText}`,
        );
      }

      return result.data; // 업데이트된 Couple 객체 반환
    },
    onSuccess: (data) => {
      alert('커플이 연결되었습니다!');
      if (typeof window !== 'undefined') {
        localStorage.setItem('coupleId', data.id);
        localStorage.setItem('isCoupleConnected', 'true');
      }
      queryClient.invalidateQueries({ queryKey: ['couple', data.id] });
    },
    onError: (error: Error) => {
      alert(error.message || '초대 수락에 실패했어요.');
    },
  });
};
