'use client';

import Link from 'next/link';

type AuthStatus = 'unauthenticated' | 'no-couple' | 'invalid-couple' | 'error';

type LoginPromptProps = {
  authStatus: AuthStatus;
  userId?: string;
};

const LoginPrompt = ({ authStatus, userId }: LoginPromptProps) => {
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
    'invalid-couple': {
      title: '잘못된 접근',
      description: '접근 권한이 없는 커플 캘린더입니다.',
      buttonText: '내 커플 공간으로 이동',
      link: userId ? `/date-calendar/${userId}` : '/couple-space',
    },
    error: {
      title: '오류 발생',
      description: '처리 중 오류가 발생했습니다. 다시 시도해주세요.',
      buttonText: '새로고침',
      link: '',
    },
  };

  const currentPrompt = promptConfig[authStatus];

  const handleClick = () => {
    if (authStatus === 'error') {
      window.location.reload();
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-3">
      <h2 className="text-b-h0 font-bold text-skin1 mb-3">
        {currentPrompt.title}
      </h2>
      <p className="text-l-title3 text-font2 mb-[52px]">
        {currentPrompt.description}
      </p>
      <Link
        href={currentPrompt.link || '#'}
        onClick={handleClick}
        className="w-[260px] h-[40px] py-2 text-skin5 text-b-h3 font-bold text-center bg-skin1 rounded-[8px] hover:bg-skin1/80 transition"
      >
        {currentPrompt.buttonText}
      </Link>
    </div>
  );
};

export default LoginPrompt;
