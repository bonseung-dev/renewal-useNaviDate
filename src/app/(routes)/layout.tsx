const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-[360px] h-[52px] bg-white border-b border-gray-200 flex items-center justify-center z-10">
        <span className="text-base font-semibold">임시헤더</span>
      </header>

      {/* 메인영역 */}
      <main className="flex-1 w-full max-w-[360px] overflow-y-auto px-4 py-3 bg-white">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-[320px] h-[52px] bg-white border border-gray-200 rounded-[20px] shadow-md mb-5 flex items-center justify-center z-10">
        <span className="text-sm font-medium">임시푸터</span>
      </footer>
    </div>
  );
};

export default Layout;
