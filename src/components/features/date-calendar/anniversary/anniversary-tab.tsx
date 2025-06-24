'use client';

import { useEffect, useState } from 'react';
import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import {
  addAnniversary,
  getAnniversaries,
  updateAnniversary,
  deleteAnniversary,
} from '@/lib/hooks/use-anniversaries';
import AnniversaryForm from './anniversary-form';
import AnniversaryList from './anniversary-list';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import dummyData from '@/lib/utils/dummy.utils';

type NewAnniversary = {
  title: string;
  date: string;
  repeat: RepeatOption;
};

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
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [repeat, setRepeat] = useState<RepeatOption>('YEARLY');
  const [open, setOpen] = useState(false);
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);

  // 커플 정보 가져오기
  const couple = dummyData.couples.find((c) => c.id === coupleId);
  const userA = couple
    ? dummyData.users.find((u) => u.id === couple.userAId)
    : null;

  // 기념일 데이터 가져오기
  useEffect(() => {
    const data = getAnniversaries(coupleId, startDate);
    setAnniversaries(data);
    console.log('Filtered anniversaries:', data);
  }, [coupleId, startDate]);

  const handleAddAnniversary = (newAnniversary: NewAnniversary) => {
    const added = addAnniversary(
      coupleId,
      {
        ...newAnniversary,
        createdBy: userId,
        coupleId: coupleId,
      },
      userId,
    );
    setAnniversaries((prev) => [...prev, added]);
    setOpen(false);
    console.log('기념일 추가:', added);
  };

  const handleEditAnniversary = (id: string) => {
    const anniversaryToEdit = anniversaries.find((a) => a.id === id);
    if (anniversaryToEdit) {
      setEditingAnniversary(anniversaryToEdit);
      setRepeat(anniversaryToEdit.repeat);
      setOpen(true);
    }
  };

  const handleUpdateAnniversary = (updatedAnniversary: NewAnniversary) => {
    if (!editingAnniversary) return;

    try {
      const updated: Anniversary = {
        ...editingAnniversary,
        ...updatedAnniversary,
        coupleId,
        createdBy: editingAnniversary.createdBy,
      };
      updateAnniversary(updated);
      setAnniversaries((prev) =>
        prev.map((a) => (a.id === editingAnniversary.id ? updated : a)),
      );
      setOpen(false);
    } catch (error) {
      alert(`${error}`);
    }
  };

  const handleDeleteAnniversary = (id: string) => {
    try {
      deleteAnniversary(id);
      setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setEditingAnniversary(null);
          setRepeat('YEARLY');
        }
      }}
    >
      <div className="flex items-center justify-center flex-col">
        <div className="w-[320px] h-[52px] flex items-center justify-between bg-skin1 rounded-[40px] px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-9 w-9 rounded-full overflow-hidden">
              <Image
                src={userA?.profileImage || '/placeholder-image.jpg'}
                alt="커플 이미지"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <span className="text-l-title4 text-skin5">
              {couple?.name || '커플 이름'}
            </span>
          </div>

          <DialogTrigger asChild>
            <button
              className="text-m-h4 bg-skin1 border border-skin5 hover:bg-skin5 hover:text-skin1 px-2 py-1 rounded-full text-skin5"
              aria-label="기념일 추가"
            >
              추가하기
            </button>
          </DialogTrigger>
        </div>

        <AnniversaryList
          anniversaries={anniversaries}
          onDelete={handleDeleteAnniversary}
          onEdit={handleEditAnniversary}
        />
      </div>

      <DialogContent className="bg-skin5 p-1 shadow-shadow1 rounded-xl w-[320px] h-[330px]">
        <DialogTitle className="sr-only">
          {editingAnniversary ? '기념일 수정' : '기념일 추가'}
        </DialogTitle>
        <DialogDescription className="sr-only">
          기념일 정보를 입력해 주세요.
        </DialogDescription>

        <AnniversaryForm
          repeat={repeat}
          onRepeatChange={setRepeat}
          onSubmit={
            editingAnniversary ? handleUpdateAnniversary : handleAddAnniversary
          }
          editingAnniversary={editingAnniversary}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AnniversaryTab;
