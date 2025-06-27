import { useState, useCallback } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import {
  addAnniversary,
  deleteAnniversary,
  getAnniversaries,
  updateAnniversary,
} from '../utils/anniversary.utils';

export const useAnniversaries = (coupleId: string, startDate: string) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>(() =>
    getAnniversaries(coupleId, startDate),
  );

  const add = useCallback(
    (newAnniversary: Omit<Anniversary, 'id'>, userId: string) => {
      const added = addAnniversary(coupleId, newAnniversary, userId);
      setAnniversaries((prev) => [...prev, added]);
      return added;
    },
    [coupleId],
  );

  const update = useCallback((updatedAnniversary: Anniversary) => {
    try {
      const updated = updateAnniversary(updatedAnniversary);
      setAnniversaries((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)),
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }, []);

  const remove = useCallback((id: string) => {
    try {
      deleteAnniversary(id);
      setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);
  return {
    anniversaries,
    addAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  };
};
