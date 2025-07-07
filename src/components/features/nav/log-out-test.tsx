'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('coupleId');
    localStorage.removeItem('anniversary');

    // 서버 쿠키 삭제 요청
    await fetch('/api/auth/delete-cookies', {
      method: 'POST',
    });

    router.push('/sign-in');
  };

  if (!isLoggedIn) return null;

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="fixed bottom-[82px] mx-auto z-20 rounded bg-skin7 px-2 py-1 text-white text-b-h5 font-semibold shadow-lg hover:bg-skin7/55 transition"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
