import Footer from '@/components/features/nav/footer';
import Header from '@/components/features/nav/header';
import LogoutButton from '@/components/features/nav/log-out-test';
import { getServerCookie } from '@/lib/utils/cookes.utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!getServerCookie('access_token');

  return (
    <div className="w-full h-screen flex flex-col items-center font-title relative">
      <Header />
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5 scrollbar-hide">
        {children}
      </main>
      <LogoutButton isLoggedIn={isLoggedIn} />
      <Footer />
    </div>
  );
};

export default Layout;
