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

  // 초기 데이터 로딩
  const loadAnniversaries = useCallback(async () => {
    const data = await getAllAnniversariesByCoupleId(coupleId, startDate);
    setAnniversaries(data);
  }, [coupleId, startDate]);

  // 기념일 생성
  const handleCreateAnniversary = useCallback(
    async (newAnniversary: Omit<Anniversary, 'id'>, userId: number) => {
      const created = await createAnniversary(coupleId, newAnniversary, userId);
      setAnniversaries((prev) => [...prev, created]);
      return created;
    },
    [coupleId],
  );

  // 기념일 수정
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

  // 기념일 삭제
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
