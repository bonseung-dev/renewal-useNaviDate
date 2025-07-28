'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCreateCouple } from '@/lib/queries/coupleQueries';
import { shareInviteLink } from '@/lib/utils/shareInviteLink';
import { getClientAuthToken } from '@/lib/utils/api';

const UnconnectedCouplePage = () => {
  const router = useRouter();
  const { mutate: createCouple, isPending } = useCreateCouple();

  const handleInvite = () => {
    const token = getClientAuthToken();
    const userId = localStorage.getItem('userId');

    console.log('Retrieved userId:', userId);
    console.log('Retrieved token from cookie:', token);

    if (!token || !userId) {
      alert('로그인이 필요합니다.');
      router.push('/sign-in');
      return;
    }
    // d
    createCouple(
      {
        userAId: userId,
        anniversary: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: (data) => {
          console.log('Couple created:', data);
          shareInviteLink(data.id.toString());
        },
        onError: (error: Error) => {
          console.error('Couple creation error:', error);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-center w-[320px] h-[480px] bg-skin3 rounded-[20px]">
      <section className="text-center">
        <p>아직 커플 등록이 안되어있어요!</p>
        <p>연인을 초대해보세요</p>
        <Button onClick={handleInvite} disabled={isPending}>
          {isPending ? '처리 중...' : '링크 공유하기'}
        </Button>
      </section>
    </div>
  );
};

export default UnconnectedCouplePage;
