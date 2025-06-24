import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="w-full max-w-[360px] h-[52px] bg-white flex items-center justify-between z-10 px-[20px]">
      <Image
        src="/Group 103.png"
        alt="Logo"
        width={130}
        height={25}
        className="h-[25px] w-[130px] object-contain"
      />

      <div className="flex items-center gap-[10px]">
        <Link
          href="/notice"
          className="w-6 h-6 flex items-center justify-center"
        >
          <Image
            src="/nav/nav-notifications.png"
            alt="Notifications"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </Link>

        <Link
          href="/settings"
          className="w-6 h-6 flex items-center justify-center"
        >
          <Image
            src="/nav/nav-settings.png"
            alt="Settings"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
