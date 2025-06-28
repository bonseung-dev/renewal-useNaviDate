'use client';

import { useState } from 'react';
import { useAnniversaries } from '@/lib/hooks/use-anniversaries';
import AnniversaryHeader from './anniversary-header';
import AnniversaryList from './anniversary-list';
import dummyData from '@/lib/utils/dummy.utils';
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
    addAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  } = useAnniversaries(coupleId, startDate);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);

  const couple = dummyData.couples.find((c) => c.id === coupleId);
  const partner: PartnerInfo | null = couple
    ? {
        id: couple.userAId === userId ? couple.userBId : couple.userAId,
        profileImage:
          dummyData.users.find(
            (u) =>
              u.id ===
              (couple.userAId === userId ? couple.userBId : couple.userAId),
          )?.profileImage || '/placeholder-image.png',
        nickname:
          dummyData.users.find(
            (u) =>
              u.id ===
              (couple.userAId === userId ? couple.userBId : couple.userAId),
          )?.nickname || '애인 이름',
      }
    : null;

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
      if (error instanceof Error && error.message === 'DUMMY_DATA_DELETE') {
        alert('더미 데이터는 삭제할 수 없습니다.');
      }
    }
  };

  const handleUpdate = async (data: Anniversary) => {
    try {
      await update(data);
      handleSubmitSuccess();
    } catch (error) {
      if (error instanceof Error && error.message === 'DUMMY_DATA_EDIT') {
        alert('더미 데이터는 수정할 수 없습니다.');
      }
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
