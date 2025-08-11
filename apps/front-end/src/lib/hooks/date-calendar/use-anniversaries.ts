import { useState, useCallback } from 'react';
import {
  createAnniversary,
  deleteAnniversaryById,
  getAllAnniversariesByCoupleId,
  updateAnniversaryById,
} from '@/lib/services/anniversary.services';
import { Anniversary } from '@use-navi-date/shared';

export const useAnniversaries = (
  coupleId: number,
  startDate: string,
  token: string,
) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);

  const loadAnniversaries = useCallback(async () => {
    const data = await getAllAnniversariesByCoupleId(
      coupleId,
      startDate,
      token,
    );
    // console.log('기념일 목록:', data);
    setAnniversaries(data);
  }, [coupleId, startDate, token]);

  const handleCreateAnniversary = useCallback(
    async (newAnniversary: Omit<Anniversary, 'id'>) => {
      // console.log('새 기념일 데이터:', newAnniversary);
      const created = await createAnniversary(coupleId, newAnniversary, token);
      setAnniversaries((prev) => [...prev, created]);
      return created;
    },
    [coupleId, token],
  );

  const handleUpdateAnniversary = useCallback(
    async (updatedAnniversary: Anniversary) => {
      try {
        const dataToUpdate = {
          ...updatedAnniversary,
          date:
            typeof updatedAnniversary.date === 'string'
              ? new Date(updatedAnniversary.date)
              : updatedAnniversary.date,
          createdBy:
            typeof updatedAnniversary.createdBy === 'number'
              ? updatedAnniversary.createdBy
              : undefined,
        };

        const updated = await updateAnniversaryById(
          updatedAnniversary.id,
          dataToUpdate,
          token,
        );
        setAnniversaries((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a)),
        );
        return updated;
      } catch (error) {
        throw error;
      }
    },
    [token],
  );

  const handleDeleteAnniversary = useCallback(
    async (id: number) => {
      try {
        await deleteAnniversaryById(id, token);
        setAnniversaries((prev) => prev.filter((a) => a.id !== id));
      } catch (error) {
        throw error;
      }
    },
    [token],
  );

  return {
    anniversaries,
    loadAnniversaries,
    createAnniversary: handleCreateAnniversary,
    updateAnniversary: handleUpdateAnniversary,
    deleteAnniversary: handleDeleteAnniversary,
  };
};
