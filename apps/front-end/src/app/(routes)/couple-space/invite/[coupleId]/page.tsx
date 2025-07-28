'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAcceptCoupleInvite } from '@/lib/queries/coupleQueries';
import { getClientAuthToken } from '@/lib/utils/api';

type InviteAcceptPageProps = {
  params: { coupleId: string };
};

const InviteAcceptPage = ({ params }: InviteAcceptPageProps) => {
  const router = useRouter();
  const {
    mutate: acceptInvite,
    isPending,
    isError,
    error,
  } = useAcceptCoupleInvite();

  const token = getClientAuthToken();
  const userBId = Number(localStorage.getItem('userId'));

  const handleAcceptInvite = () => {
    if (!token || !userBId) {
      alert('로그인이 필요합니다.');
      router.push('/sign-in');
      return;
    }

    acceptInvite(
      {
        coupleId: String(params.coupleId),
        userBId: String(userBId),
      },
      {
        onSuccess: () => {
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
