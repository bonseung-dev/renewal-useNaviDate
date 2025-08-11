import { useAnniversariesMutation } from '@/lib/mutations/anniversaries.mutation';
import { useAnniversariesQuery } from '@/lib/queries/anniversaries.query';

export const useAnniversaries = (
  coupleId: number,
  startDate: string,
  token: string,
) => {
  const { data, isLoading, isError, refetch } = useAnniversariesQuery(
    coupleId,
    startDate,
    token,
  );
  const { createAnniversary, updateAnniversary, deleteAnniversary } =
    useAnniversariesMutation(coupleId, token);

  return {
    anniversaries: data ?? [],
    isLoading,
    isError,
    refetch,
    createAnniversary,
    updateAnniversary,
    deleteAnniversary,
  };
};
