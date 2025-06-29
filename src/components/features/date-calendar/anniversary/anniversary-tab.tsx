'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAnniversaries } from '@/lib/hooks/use-anniversaries';
import AnniversaryHeader from './anniversary-header';
import AnniversaryList from './anniversary-list';
import AnniversaryEditor from './anniversary-editor';
import { Anniversary, PartnerInfo } from '@/types/anniversary.type';
import { Dialog } from '@/components/ui/dialog';

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
    addAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  } = useAnniversaries(coupleId, startDate);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);
  const [partner, setPartner] = useState<PartnerInfo | null>(null);

  // 파트너 정보 가져오기 함수 (useCallback으로 메모이제이션)
  const fetchPartnerInfo = useCallback(async () => {
    try {
      // 커플 정보 가져오기
      const coupleResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/couples/${coupleId}`,
      );
      if (!coupleResponse.ok) throw new Error('Failed to fetch couple data');
      const couple = await coupleResponse.json();

      // 파트너 ID 결정
      const partnerId =
        couple.userAId === userId ? couple.userBId : couple.userAId;

      // 파트너 정보 가져오기
      const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${partnerId}`,
      );
      if (!userResponse.ok) throw new Error('Failed to fetch partner data');
      const partnerData = await userResponse.json();

      setPartner({
        id: partnerId,
        profileImage: partnerData.profileImage || '/placeholder-image.png',
        nickname: partnerData.nickname || '애인 이름',
      });
    } catch (error) {
      console.error('Error fetching partner info:', error);
      setPartner(null);
    }
  }, [coupleId, userId]);

  // 초기 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([loadAnniversaries(), fetchPartnerInfo()]);
      } catch (error) {
        console.error('Error loading initial data:', error);
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
      <div className="flex items-center justify-center flex-col">
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
      </div>
    </Dialog>
  );
};

export default AnniversaryTab;
