'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. API Route 호출
      await fetch('/api/auth/logout', { method: 'POST' });

      // 2. 클라이언트 정리
      localStorage.clear();
      sessionStorage.clear();

      // 3. 강제 페이지 리로드
      window.location.href = '/sign-in';
    } catch (error) {
      window.location.href = '/sign-in';
    }
  };

  if (!isLoggedIn) return null;

  return (
    <button
      onClick={handleLogout}
      className="rounded-full bg-skin5 border border-skin1 px-2 py-1 text-skin1 text-m-h4 hover:bg-skin7 hover:text-skin5 hover:border-skin7 transition"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
