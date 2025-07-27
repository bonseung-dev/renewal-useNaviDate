import Footer from '@/components/features/nav/footer';
import Header from '@/components/features/nav/header';
import LogoutButton from '@/components/features/nav/log-out-test';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center font-title relative">
      <Header />
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5 scrollbar-hide">
        {children}
      </main>
      <div className="absolute bottom-[52px] w-full max-w-[360px] h-[62px] bg-gradient-to-t from-skin5/100 to-skin5/0 pointer-events-none z-10" />
      <Footer />
      {/* 로그아웃 버튼은 임시로 만든거고 지울 예정*/}
      {/* <LogoutButton /> */}
    </div>
  );
};
export default Layout;
