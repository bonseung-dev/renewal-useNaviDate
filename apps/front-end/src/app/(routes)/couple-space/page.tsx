'use client';

import React, { useState, useEffect } from 'react';
import ConnectedCoupleSpacePage from '@/components/features/couple-space/ConnectedCoupleSpacePage';
import UnconnectedCouplePage from '@/components/features/couple-space/UnconnectedCouplePage';
import { useCouple } from '@/lib/queries/coupleQueries';

const CoupleSpacePage: React.FC = () => {
  const [coupleId, setCoupleId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { data: couple, isLoading, isError, error } = useCouple(coupleId);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedCoupleId = localStorage.getItem('coupleId');
      console.log('Stored coupleId:', storedCoupleId); // 디버깅용
      setCoupleId(storedCoupleId);
    }
  }, []);

  useEffect(() => {
    if (
      isError &&
      error?.message.includes('Not Found') &&
      typeof window !== 'undefined'
    ) {
      console.log('Clearing invalid coupleId from localStorage');
      localStorage.removeItem('coupleId');
      localStorage.removeItem('isCoupleConnected');
      setCoupleId(null);
    }
  }, [isError, error]);

  if (!isClient) return null;

  if (coupleId === null || isLoading || isError) {
    return <UnconnectedCouplePage />;
  }

  const isConnected = couple?.status === 'confirm';

  return isConnected ? <ConnectedCoupleSpacePage /> : <UnconnectedCouplePage />;
};

export default CoupleSpacePage;
