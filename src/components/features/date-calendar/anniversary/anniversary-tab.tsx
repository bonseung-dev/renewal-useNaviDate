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

type NewAnniversary = {
  title: string;
  date: string;
  repeat: RepeatOption;
};

type AnniversaryTabProps = {
  coupleId: string;
  startDate: string;
};

const AnniversaryTab = ({ coupleId, startDate }: AnniversaryTabProps) => {
  const [anniversaries, setAnniversaries] = useState<Anniversary[]>([]);
  const [repeat, setRepeat] = useState<RepeatOption>('YEARLY');
  const [open, setOpen] = useState(false);
  const [editingAnniversary, setEditingAnniversary] =
    useState<Anniversary | null>(null);

  useEffect(() => {
    const data = getAnniversaries(coupleId, startDate);
    setAnniversaries(data);
  }, [coupleId, startDate]);

  const handleAddAnniversary = (newAnniversary: NewAnniversary) => {
    const added = addAnniversary(coupleId, {
      ...newAnniversary,
      created_by: 'user',
      couple_id: coupleId,
    });
    setAnniversaries((prev) => [...prev, added]);
    setOpen(false);
    console.log('기념일 추가:', added); // 디버깅 로그
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
    const updated = {
      ...editingAnniversary,
      ...updatedAnniversary,
      created_by: 'user',
      couple_id: coupleId,
    };
    updateAnniversary(updated);
    setAnniversaries((prev) =>
      prev.map((a) => (a.id === editingAnniversary.id ? updated : a)),
    );
    setEditingAnniversary(null);
    setOpen(false);
    console.log('기념일 수정:', updated); // 디버깅 로그
  };

  const handleDeleteAnniversary = (id: string) => {
    deleteAnniversary(id);
    setAnniversaries((prev) => prev.filter((a) => a.id !== id));
    console.log('기념일 삭제:', id); // 디버깅 로그
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
        <div className="w-[320px] h-[52px] flex items-center justify-between bg-[#7BB4DD] rounded-[40px] px-4">
          <div className="flex items-center gap-2">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Og0eTxPdFSH4GjaCkkbiqyeAjlLkafGbqA&s"
              alt="커플 이미지"
              width={32}
              height={32}
              className="h-auto w-8 rounded-full object-cover"
            />
            <span className="font-semibold text-sm text-white">
              짱구 ❤️ 수지
            </span>
          </div>

          <DialogTrigger asChild>
            <button
              className="text-xs bg-[#7BB4DD] border border-white hover:bg-white hover:text-[#7BB4DD] px-3 py-1 rounded-full text-white font-medium"
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

      <DialogContent className="bg-white p-1 shadow-lg rounded-xl w-[320px] h-[330px]">
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
