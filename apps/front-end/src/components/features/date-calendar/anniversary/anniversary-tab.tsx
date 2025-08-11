import { useEffect } from 'react';
import AnniversaryHeader from './anniversary-header';
import AnniversaryList from './anniversary-list';
import { Dialog } from '@/components/ui/dialog';
import { useAnniversaries } from '@/lib/hooks/date-calendar/use-anniversaries';
import { usePartnerInfo } from '@/lib/hooks/date-calendar/use-partner-infor';
import { useAnniversaryActions } from '@/lib/hooks/date-calendar/use-anniversary-actions';
import AnniversaryEditor from './anniversary-form/anniversary-editor';

type AnniversaryTabProps = {
  coupleId: number;
  startDate: string;
  userId: number;
  token: string;
};

const AnniversaryTab = ({
  coupleId,
  startDate,
  userId,
  token,
}: AnniversaryTabProps) => {
  const {
    anniversaries,
    loadAnniversaries,
    createAnniversary: add,
    updateAnniversary: update,
    deleteAnniversary: remove,
  } = useAnniversaries(coupleId, startDate, token);
  console.log(startDate, '기념일 시작 날짜');

  const { partner, fetchPartnerInfo } = usePartnerInfo(coupleId, userId, token);
  // console.log('파트너 정보:', partner);

  const {
    editingAnniversary,
    isEditorOpen,
    setIsEditorOpen,
    handleEdit,
    handleDelete,
    handleUpdate,
    handleAddClick,
    handleSubmitSuccess,
  } = useAnniversaryActions(update, remove);

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
          onEdit={(id) => handleEdit(id, anniversaries)}
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
