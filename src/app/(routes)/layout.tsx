import Footer from '@/components/features/nav/footer';
import Header from '@/components/features/nav/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center font-title">
      {/* Header */}
      <Header />

      {/* 메인영역 */}
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5">
        {children}
      </main>

      {/* Gradient */}
      <div className="absolute bottom-[52px] w-full max-w-[360px] h-[62px] bg-gradient-to-t from-skin5/100 to-skin5/0 pointer-events-none z-10" />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
