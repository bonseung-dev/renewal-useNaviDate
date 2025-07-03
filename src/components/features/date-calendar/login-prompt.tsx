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
      buttonText: '로그인하기',
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
    <div className="w-full flex flex-col items-center p-4">
      <h2 className="text-b-h2 text-font3 font-bold mb-4">
        {currentPrompt.title}
      </h2>
      <p className="text-m-h4 text-font2 mb-4">{currentPrompt.description}</p>
      <Link
        href={currentPrompt.link}
        className="py-2 px-8 text-skin1 text-L-title3 border-2 border-skin1 rounded hover:bg-skin1 hover:text-white transition"
      >
        {currentPrompt.buttonText}
      </Link>
    </div>
  );
};

export default LoginPrompt;
