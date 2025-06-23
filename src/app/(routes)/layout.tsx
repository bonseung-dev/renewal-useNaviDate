import Footer from '@/components/features/nav/footer';
import Header from '@/components/features/nav/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Header */}
      <Header />

      {/* 메인영역 */}
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-white">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
