import Footer from '@/components/features/nav/footer';
import Header from '@/components/features/nav/header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center font-title relative">
      <Header />
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-skin5 scrollbar-hide">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
