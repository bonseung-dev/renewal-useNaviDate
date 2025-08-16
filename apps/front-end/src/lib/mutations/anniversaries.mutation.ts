import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAnniversary,
  updateAnniversaryById,
  deleteAnniversaryById,
} from '@/lib/services/anniversary.services';
import { Anniversary } from '@use-navi-date/shared';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

export const useAnniversariesMutation = (coupleId: number, token: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newAnniversary: Omit<Anniversary, 'id'>) =>
      createAnniversary(coupleId, newAnniversary, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ANNIVERSARIES_BY_COUPLE(coupleId),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updated: Anniversary) =>
      updateAnniversaryById(updated.id, updated, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ANNIVERSARIES_BY_COUPLE(coupleId),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAnniversaryById(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ANNIVERSARIES_BY_COUPLE(coupleId),
      });
    },
  });

  return {
    createAnniversary: createMutation.mutateAsync,
    updateAnniversary: updateMutation.mutateAsync,
    deleteAnniversary: deleteMutation.mutateAsync,
  };
};
