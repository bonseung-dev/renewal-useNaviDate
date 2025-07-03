'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAnniversaries } from '@/lib/hooks/use-anniversaries';
import AnniversaryHeader from './anniversary-header';
import AnniversaryList from './anniversary-list';
import AnniversaryEditor from './anniversary-editor';
import { Anniversary, PartnerInfo } from '@/types/anniversary.type';
import { Dialog } from '@/components/ui/dialog';

import {
  DEFAULT_NICKNAME,
  PLACEHOLDER_IMAGE,
} from '@/constants/anniversary.constants';
import {
  getCoupleById,
  getUserById,
} from '@/lib/services/anniversary.services';

type AnniversaryTabProps = {
  coupleId: string;
  startDate: string;
  userId: string;
};

const AnniversaryTab = ({
  coupleId,
  startDate,
  userId,
}: AnniversaryTabProps) => {
  const {
    anniversaries,
    loadAnniversaries,
    createAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  } = useAnniversaries(coupleId, startDate);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);
  const [partner, setPartner] = useState<PartnerInfo | null>(null);

  const fetchPartnerInfo = useCallback(async () => {
    try {
      const couple = await getCoupleById(coupleId);

      const partnerId =
        couple.userAId === userId ? couple.userBId : couple.userAId;

      const partnerData = await getUserById(partnerId);

      setPartner({
        id: partnerId,
        profileImage: partnerData.profileImage || PLACEHOLDER_IMAGE,
        nickname: partnerData.nickname || DEFAULT_NICKNAME,
      });
    } catch (error) {
      console.error('파트너 정보 가져오기 실패했습니다.:', error);
      setPartner(null);
    }
  }, [coupleId, userId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([loadAnniversaries(), fetchPartnerInfo()]);
      } catch (error) {
        console.error('초기 데이터 로딩 실패했습니다.:', error);
      }
    };

    loadData();
  }, [loadAnniversaries, fetchPartnerInfo]);

  const handleAddClick = () => {
    setEditingAnniversary(null);
    setIsEditorOpen(true);
  };

  const handleEdit = (id: string) => {
    const anniversaryToEdit = anniversaries.find((a) => a.id === id);
    setEditingAnniversary(anniversaryToEdit || null);
    setIsEditorOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
    } catch (error) {
      console.error('Error deleting anniversary:', error);
      alert('기념일 삭제에 실패했습니다.');
    }
  };

  const handleUpdate = async (data: Anniversary) => {
    try {
      await update(data);
      handleSubmitSuccess();
    } catch (error) {
      console.error('Error updating anniversary:', error);
      alert('기념일 수정에 실패했습니다.');
    }
  };

  const handleSubmitSuccess = () => {
    setIsEditorOpen(false);
    setEditingAnniversary(null);
  };

  return (
    <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
      <section
        className="flex items-center justify-center flex-col"
        aria-labelledby="anniversary-section"
      >
        <h1 id="anniversary-section" className="sr-only">
          기념일 관리
        </h1>

        <AnniversaryHeader partner={partner} onAddClick={handleAddClick} />

        <AnniversaryList
          anniversaries={anniversaries}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        <AnniversaryEditor
          coupleId={coupleId}
          userId={userId}
          onAdd={add}
          onUpdate={handleUpdate}
          initialData={editingAnniversary}
          onSubmitSuccess={handleSubmitSuccess}
        />
      </section>
    </Dialog>
  );
};

export default AnniversaryTab;
