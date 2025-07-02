import dayjs from 'dayjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Anniversary, CreateAnniversaryDto } from '@use-navi-date/shared';
import { AnniversaryService } from '@/lib/api/services';
import { getClientAuthToken } from '@/lib/utils/api';
import {
  generateAutoAnniversaries,
  initializeDummyData,
} from '../utils/anniversary.utils';
import { STORAGE_KEY } from '@/constants/holiday.constants';

// 백엔드 연결 후: 이 함수는 api를 가져오는 것으로 대체
// 자동 생성 기념일은 서버에서 계산하거나, 클라이언트에서 여전히 생성 가능
export const getAnniversaries = (
  coupleId: string,
  startDate: string,
): Anniversary[] => {
  initializeDummyData(coupleId); // 테스트용 더미 데이터 초기화
  const auto = generateAutoAnniversaries(startDate, coupleId);
  const custom = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '[]',
  ) as Anniversary[];
  const all = [...auto, ...custom.filter((a) => a.coupleId === coupleId)];
  const oneYearLater = dayjs().add(1, 'year');
  return all.filter((a) => dayjs(a.date).isBefore(oneYearLater));
};

// 새로운 서비스 레이어 기반 훅들
export const useAnniversaries = (coupleId: string | null) => {
  return useQuery<Anniversary[]>({
    queryKey: ['anniversaries', coupleId],
    queryFn: async () => {
      if (!coupleId) {
        throw new Error('커플 ID가 없습니다.');
      }
      
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await AnniversaryService.getCoupleAnniversaries(coupleId, token);
      if (!response.success) {
        throw new Error(response.message || '기념일 목록을 가져오지 못했습니다.');
      }
      
      return response.data!.anniversaries;
    },
    enabled: !!coupleId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useAnniversary = (anniversaryId: string | null) => {
  return useQuery<Anniversary>({
    queryKey: ['anniversary', anniversaryId],
    queryFn: async () => {
      if (!anniversaryId) {
        throw new Error('기념일 ID가 없습니다.');
      }
      
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await AnniversaryService.getAnniversary(anniversaryId, token);
      if (!response.success) {
        throw new Error(response.message || '기념일을 가져오지 못했습니다.');
      }
      
      return response.data!.anniversary;
    },
    enabled: !!anniversaryId,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useCreateAnniversary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (anniversaryData: CreateAnniversaryDto) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await AnniversaryService.createAnniversary(anniversaryData, token);
      if (!response.success) {
        throw new Error(response.message || '기념일 생성에 실패했습니다.');
      }
      
      return response.data!.anniversary;
    },
    onSuccess: (data) => {
      alert('기념일이 생성되었습니다!');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['anniversaries', data.coupleId] });
      queryClient.invalidateQueries({ queryKey: ['anniversary', data.id] });
    },
    onError: (error: Error) => {
      alert(error.message || '기념일 생성에 실패했어요.');
    },
  });
};

export const useUpdateAnniversary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateAnniversaryDto> }) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await AnniversaryService.updateAnniversary(id, data, token);
      if (!response.success) {
        throw new Error(response.message || '기념일 수정에 실패했습니다.');
      }
      
      return response.data!.anniversary;
    },
    onSuccess: (data) => {
      alert('기념일이 수정되었습니다!');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['anniversaries', data.coupleId] });
      queryClient.invalidateQueries({ queryKey: ['anniversary', data.id] });
    },
    onError: (error: Error) => {
      alert(error.message || '기념일 수정에 실패했어요.');
    },
  });
};

export const useDeleteAnniversary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (anniversaryId: string) => {
      const token = getClientAuthToken();
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await AnniversaryService.deleteAnniversary(anniversaryId, token);
      if (!response.success) {
        throw new Error(response.message || '기념일 삭제에 실패했습니다.');
      }
      
      return response.data!.message;
    },
    onSuccess: (message, anniversaryId) => {
      alert(message || '기념일이 삭제되었습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['anniversaries'] });
      queryClient.removeQueries({ queryKey: ['anniversary', anniversaryId] });
    },
    onError: (error: Error) => {
      alert(error.message || '기념일 삭제에 실패했어요.');
    },
  });
};

// API 기반 함수들로 교체
export const updateAnniversary = async (
  updatedAnniversary: Anniversary,
): Promise<Anniversary> => {
  const token = getClientAuthToken();
  if (!token) {
    throw new Error('인증 토큰이 필요합니다.');
  }

  const response = await AnniversaryService.updateAnniversary(
    updatedAnniversary.id,
    {
      coupleId: updatedAnniversary.coupleId,
      title: updatedAnniversary.title,
      date: new Date(updatedAnniversary.date),
      description: updatedAnniversary.memo,
    },
    token
  );
  
  if (!response.success) {
    throw new Error(response.message || '기념일 수정에 실패했습니다.');
  }
  
  return response.data!.anniversary;
};

// 기존 코드와의 호환성을 위한 별칭 함수들 (API 기반)
export const addAnniversary = async (anniversary: CreateAnniversaryDto): Promise<Anniversary> => {
  const token = getClientAuthToken();
  if (!token) {
    throw new Error('인증 토큰이 필요합니다.');
  }

  const response = await AnniversaryService.createAnniversary(anniversary, token);
  if (!response.success) {
    throw new Error(response.message || '기념일 생성에 실패했습니다.');
  }
  
  return response.data!.anniversary;
};

export const deleteAnniversary = async (anniversaryId: string): Promise<void> => {
  const token = getClientAuthToken();
  if (!token) {
    throw new Error('인증 토큰이 필요합니다.');
  }

  const response = await AnniversaryService.deleteAnniversary(anniversaryId, token);
  if (!response.success) {
    throw new Error(response.message || '기념일 삭제에 실패했습니다.');
  }
};
