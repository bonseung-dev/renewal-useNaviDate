'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCreateCouple } from '@/lib/queries/coupleQueries';

type InviteAcceptPageProps = {
  params: { coupleId: string };
};

const InviteAcceptPage = ({ params }: InviteAcceptPageProps) => {
  const router = useRouter();
  const { mutate: createCouple, isPending, isError, error } = useCreateCouple();
  const userBId = 'userB';
  const userAId = 'userA';

  const handleAcceptInvite = () => {
    createCouple(
      {
        user2Id: userBId,
      },
      {
        onSuccess: (data) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('coupleId', data.id);
            localStorage.setItem('isCoupleConnected', 'true');
          }
          router.push('/couple-space');
        },
        onError: (error: Error) => {
          alert(error.message || '초대 수락에 실패했어요.');
        },
      },
    );
  };

  if (isError) {
    return <div>초대 처리 중 오류가 발생했어요: {error?.message}</div>;
  }

  return (
    <div>
      <h2>커플 초대 수락</h2>
      <p>연인과 함께 추억을 기록하시겠습니까?</p>
      <Button onClick={handleAcceptInvite} disabled={isPending}>
        {isPending ? '처리 중...' : '초대 수락'}
      </Button>
    </div>
  );
};

export default InviteAcceptPage;
