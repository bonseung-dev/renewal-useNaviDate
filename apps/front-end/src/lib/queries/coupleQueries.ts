import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Couple, CreateCoupleDto } from '@use-navi-date/shared';
import { CoupleService } from '@/lib/api/services';
import { getClientAuthToken } from '@/lib/utils/api';

// 커플 데이터 조회
export const useCouple = (coupleId: string | null) => {
  return useQuery<Couple>({
    queryKey: ['couple', coupleId],
    queryFn: async () => {
      if (!coupleId) {
        throw new Error('커플 ID가 없습니다.');
      }
      
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await CoupleService.getCouple(coupleId, token);
      if (!response.success) {
        throw new Error(response.message || '커플 데이터를 가져오지 못했습니다.');
      }
      
      return response.data!.couple;
    },
    enabled: !!coupleId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 커플 목록 조회
export const useCouples = () => {
  return useQuery<Couple[]>({
    queryKey: ['couples'],
    queryFn: async () => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await CoupleService.getCouples(token);
      if (!response.success) {
        throw new Error(response.message || '커플 목록을 가져오지 못했습니다.');
      }
      
      return response.data!.couples;
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 커플 생성
export const useCreateCouple = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (coupleData: CreateCoupleDto) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await CoupleService.createCouple(coupleData, token);
      if (!response.success) {
        throw new Error(response.message || '커플 생성에 실패했습니다.');
      }
      
      return response.data!.couple;
    },
    onSuccess: (data) => {
      alert('커플이 생성되었습니다!');
      if (typeof window !== 'undefined') {
        localStorage.setItem('coupleId', data.id);
      }
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['couples'] });
      queryClient.invalidateQueries({ queryKey: ['couple', data.id] });
    },
    onError: (error: Error) => {
      alert(error.message || '커플 생성에 실패했어요.');
    },
  });
};

// 커플 삭제
export const useDeleteCouple = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (coupleId: string) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await CoupleService.deleteCouple(coupleId, token);
      if (!response.success) {
        throw new Error(response.message || '커플 삭제에 실패했습니다.');
      }
      
      return response.data!.message;
    },
    onSuccess: (message, coupleId) => {
      alert(message || '커플이 삭제되었습니다.');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coupleId');
      }
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['couples'] });
      queryClient.removeQueries({ queryKey: ['couple', coupleId] });
    },
    onError: (error: Error) => {
      alert(error.message || '커플 삭제에 실패했어요.');
    },
  });
};
