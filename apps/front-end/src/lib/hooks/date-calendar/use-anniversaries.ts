import { useState, useCallback } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import {
  createAnniversary,
  deleteAnniversaryById,
  getAllAnniversariesByCoupleId,
  updateAnniversaryById,
} from '@/lib/services/anniversary.services';

export const useAnniversaries = (coupleId: number, startDate: string) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);

  const loadAnniversaries = useCallback(async () => {
    const data = await getAllAnniversariesByCoupleId(coupleId, startDate);
    console.log('기념일 목록:', data);
    setAnniversaries(data);
  }, [coupleId, startDate]);

  const handleCreateAnniversary = useCallback(
    async (newAnniversary: Omit<Anniversary, 'id'>) => {
      const created = await createAnniversary(coupleId, newAnniversary);
      setAnniversaries((prev) => [...prev, created]);
      return created;
    },
    [coupleId],
  );

  const handleUpdateAnniversary = useCallback(
    async (updatedAnniversary: Anniversary) => {
      try {
        const updated = await updateAnniversaryById(
          updatedAnniversary.id,
          updatedAnniversary,
        );
        setAnniversaries((prev) =>
          prev.map((a) => (a.id === updated.id ? updated : a)),
        );
        return updated;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const handleDeleteAnniversary = useCallback(async (id: number) => {
    try {
      await deleteAnniversaryById(id);
      setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    anniversaries,
    loadAnniversaries,
    createAnniversary: handleCreateAnniversary,
    updateAnniversary: handleUpdateAnniversary,
    deleteAnniversary: handleDeleteAnniversary,
  };
};
