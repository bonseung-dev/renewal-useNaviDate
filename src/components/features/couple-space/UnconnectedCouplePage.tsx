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
    <div>
      <h2>연인을 초대하세요!</h2>
      <p>연인과 함께 추억을 기록할 특별한 공간을 만들어보세요.</p>
      <Button onClick={handleInvite}>초대하기</Button>
    </div>
  );
};

export default UnconnectedCouplePage;
