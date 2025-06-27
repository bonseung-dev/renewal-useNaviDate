import Link from 'next/link';
import Image from 'next/image';
import { Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full max-w-[360px] h-[52px] bg-white flex items-center justify-between z-10 px-[20px]">
      <div className="h-[30px] w-[134px] flex items-center gap-1 text-skin1 text-b-h3 font-bold">
        <Image
          src="/navidate-logo_blue.png"
          alt="Logo"
          width={30}
          height={30}
          className="h-[30px] w-[30px] object-contain"
        />
        useNavidate( )
      </div>

      <div className="flex items-center gap-1">
        <Link
          href="/notice"
          className="w-6 h-6 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[22px] h-[22px] text-skin1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2a7 7 0 0 0-7 7v5.586l-1.707 1.707a1 1 0 0 0 .707 1.707h16a1 1 0 0 0 .707-1.707L19 14.586V9a7 7 0 0 0-7-7zM12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22z" />
          </svg>
        </Link>

        <Link
          href="/settings"
          className="w-6 h-6 flex items-center justify-center"
        >
          <Settings className="w-[22px] h-[22px] text-skin1" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
