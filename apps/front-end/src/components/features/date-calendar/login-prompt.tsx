'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const LoginPrompt = () => {
  const [authState, setAuthState] = useState<
    'loading' | 'unauthenticated' | 'no-couple' | 'authenticated'
  >('loading');

  useEffect(() => {
    const userId =
      typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    const coupleId =
      typeof window !== 'undefined' ? localStorage.getItem('coupleId') : null;

    if (!userId) {
      setAuthState('unauthenticated');
    } else if (!coupleId) {
      setAuthState('no-couple');
    } else {
      setAuthState('authenticated');
    }
  }, []);

  if (authState === 'loading') {
    return (
      <div className="w-full flex flex-col items-center p-4">
        <p className="text-m-h4 text-font2">로딩 중...</p>
      </div>
    );
  }

  if (authState === 'authenticated') {
    return null;
  }

  const promptConfig = {
    unauthenticated: {
      title: '로그인 필요',
      description: '해당 기능을 보려면 로그인이 필요합니다.',
      buttonText: '로그인 하러가기',
      link: '/sign-in',
    },
    'no-couple': {
      title: '커플 연결 필요',
      description: '해당 기능을 사용하려면 커플을 연결해주세요.',
      buttonText: '커플 연결하기',
      link: '/couple-space',
    },
  };

  const currentPrompt = promptConfig[authState];

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-3">
      <h2 className="text-b-h0 font-bold text-skin1 mb-3">
        {currentPrompt.title}
      </h2>
      <p className="text-l-title3 text-font2 mb-[52px]">
        {currentPrompt.description}
      </p>
      <Link
        href={currentPrompt.link}
        className="w-[260px] h-[40px] py-2 text-skin5 text-b-h3 font-bold text-center bg-skin1 rounded-[8px] hover:bg-skin1/80 transition"
      >
        {currentPrompt.buttonText}
      </Link>
    </div>
  );
};

export default LoginPrompt;
