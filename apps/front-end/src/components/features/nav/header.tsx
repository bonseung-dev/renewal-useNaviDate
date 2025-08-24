import Link from 'next/link';
import Image from 'next/image';
import { Bell, Settings } from 'lucide-react';

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

      <nav className="flex items-center gap-1">
        <Link
          href="/notice"
          className="w-6 h-6 flex items-center justify-center"
        >
          <Bell className="w-[22px] h-[22px] stroke-none fill-skin1" />
        </Link>

        <Link
          href="/settings"
          className="w-6 h-6 flex items-center justify-center"
        >
          <Settings className="w-[22px] h-[22px] text-skin1" />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
