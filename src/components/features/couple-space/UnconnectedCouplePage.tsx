'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { shareInviteLink } from '@/lib/utils/shareInviteLink';
import { v4 as uuidv4 } from 'uuid';

const UnconnectedCouplePage = () => {
  const handleInvite = () => {
    const tempCoupleId = uuidv4();
    if (typeof window !== 'undefined') {
      localStorage.setItem('coupleId', tempCoupleId);
    }
    shareInviteLink(tempCoupleId);
  };

  return (
    <div className="flex items-center justify-center w-[320px] h-[480px] bg-skin3 rounded-[20px] ">
      <section className="text-center ">
        <p>아직 커플 등록이 안되어있어요!</p>
        <p>연인을 초대해보세요</p>
        <Button onClick={handleInvite}>링크 공유하기</Button>
      </section>
    </div>
  );
};

export default UnconnectedCouplePage;
