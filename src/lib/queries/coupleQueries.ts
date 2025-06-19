import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Couple } from '@/types/couple.type';

const API_BASE_URL = 'http://localhost:4000';

// 커플 데이터 조회
export const useCouple = (coupleId: string | null) => {
  return useQuery<Couple>({
    queryKey: ['couple', coupleId],
    queryFn: async () => {
      if (!coupleId) {
        throw new Error('커플 ID가 없습니다.');
      }
      const response = await fetch(`${API_BASE_URL}/couples/${coupleId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`커플 데이터를 가져오지 못했습니다: ${errorText}`);
      }
      return response.json();
    },
    enabled: !!coupleId,
    retry: 1,
    staleTime: 0,
  });
};
// 커플 생성
export const useCreateCouple = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      user_a_id: string;
      user_b_id: string;
      anniversary: string;
      name: string;
      coupleId?: string;
    }) => {
      const newCouple = {
        ...data,
        id: data.coupleId || crypto.randomUUID(),
        status: 'confirm',
        created_at: new Date().toISOString(),
      };
      const response = await fetch(`${API_BASE_URL}/couples`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCouple),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`커플 생성에 실패했습니다: ${errorText}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      alert('커플이 생성되었습니다!');
      if (typeof window !== 'undefined') {
        localStorage.setItem('coupleId', data.id);
      }
      queryClient.invalidateQueries({ queryKey: ['couples', data.user_a_id] });
      queryClient.refetchQueries({ queryKey: ['couples', data.user_a_id] });
    },
    onError: (error: Error) => {
      alert(error.message || '커플 생성에 실패했어요.');
    },
  });
};
