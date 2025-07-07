import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import AnniversaryForm from './anniversary-form';

type AnniversaryEditorProps = {
  coupleId: number;
  userId: number;
  onAdd: (data: Omit<Anniversary, 'id'>, userId: number) => void;
  onUpdate: (data: Anniversary) => void;
  initialData?: Anniversary | null;
  onSubmitSuccess?: () => void;
};

const AnniversaryEditor = ({
  coupleId,
  userId,
  onAdd,
  onUpdate,
  initialData,
  onSubmitSuccess,
}: AnniversaryEditorProps) => {
  const [repeat, setRepeat] = useState<RepeatOption>('YEARLY');

  const handleSubmit = (data: {
    title: string;
    date: string;
    repeat: RepeatOption;
  }) => {
    if (initialData) {
      onUpdate({
        ...initialData,
        ...data,
        coupleId,
        createdBy: initialData.createdBy,
      });
    } else {
      onAdd({ ...data, createdBy: new Date(userId), coupleId }, userId);
    }
    onSubmitSuccess?.();
  };

  return (
    <DialogContent className="bg-skin5 p-1 shadow-shadow1 rounded-xl w-[320px] h-[280px]">
      <DialogTitle className="sr-only">
        {initialData ? '기념일 수정' : '기념일 추가'}
      </DialogTitle>
      <DialogDescription className="sr-only">
        기념일 정보를 입력해 주세요.
      </DialogDescription>

      <AnniversaryForm
        repeat={repeat}
        onRepeatChange={setRepeat}
        onSubmit={handleSubmit}
        editingAnniversary={initialData}
      />
    </DialogContent>
  );
};

export default AnniversaryEditor;
