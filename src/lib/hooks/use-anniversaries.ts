import { useState, useCallback } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import {
  addAnniversary,
  deleteAnniversary,
  getAnniversaries,
  updateAnniversary,
} from '../services/anniversary.services';

export const useAnniversaries = (coupleId: string, startDate: string) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);

  // 초기 데이터 로딩
  const loadAnniversaries = useCallback(async () => {
    const data = await getAnniversaries(coupleId, startDate);
    setAnniversaries(data);
  }, [coupleId, startDate]);

  // 기념일 추가
  const add = useCallback(
    async (newAnniversary: Omit<Anniversary, 'id'>, userId: string) => {
      const added = await addAnniversary(coupleId, newAnniversary, userId);
      setAnniversaries((prev) => [...prev, added]);
      return added;
    },
    [coupleId],
  );

  // 기념일 수정
  const update = useCallback(async (updatedAnniversary: Anniversary) => {
    try {
      const updated = await updateAnniversary(updatedAnniversary);
      setAnniversaries((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a)),
      );
      return updated;
    } catch (error) {
      throw error;
    }
  }, []);

  // 기념일 삭제
  const remove = useCallback(async (id: string) => {
    try {
      await deleteAnniversary(id);
      setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    anniversaries,
    loadAnniversaries, // 추가: 초기 데이터 로딩 함수
    addAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  };
};
