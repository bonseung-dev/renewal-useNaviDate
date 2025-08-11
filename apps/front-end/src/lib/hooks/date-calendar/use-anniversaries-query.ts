import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllAnniversariesByCoupleId,
  createAnniversary,
  updateAnniversaryById,
  deleteAnniversaryById,
} from '@/lib/services/anniversary.services';
import { Anniversary } from '@use-navi-date/shared';

export const useAnniversariesQuery = (
  coupleId: number,
  startDate: string,
  token: string,
) => {
  const queryClient = useQueryClient();

  // 조회
  const anniversariesQuery = useQuery<Anniversary[]>({
    queryKey: ['anniversaries', coupleId],
    queryFn: () => getAllAnniversariesByCoupleId(coupleId, startDate, token),
    enabled: !!coupleId && !!token,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  // 생성
  const createMutation = useMutation({
    mutationFn: (newAnniversary: Omit<Anniversary, 'id'>) =>
      createAnniversary(coupleId, newAnniversary, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anniversaries', coupleId] });
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: (updated: Anniversary) =>
      updateAnniversaryById(
        updated.id,
        updated,

        token,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anniversaries', coupleId] });
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAnniversaryById(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anniversaries', coupleId] });
    },
  });

  return {
    // Query
    anniversaries: anniversariesQuery.data ?? [],
    isLoading: anniversariesQuery.isLoading,
    isError: anniversariesQuery.isError,
    refetch: anniversariesQuery.refetch,

    // Mutations
    createAnniversary: createMutation.mutateAsync,
    updateAnniversary: updateMutation.mutateAsync,
    deleteAnniversary: deleteMutation.mutateAsync,
  };
};
