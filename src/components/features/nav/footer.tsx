import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="w-full max-w-[320px] h-[52px] bg-skin1 rounded-[20px] shadow-md mb-5 flex items-center justify-evenly z-10">
      {/* 캘린더 아이콘 */}
      <Link
        href="/date-calendar"
        className="w-[30px] h-[30px] flex items-center justify-center"
      >
        <Image
          src="/nav/nav-calendar.png"
          alt="Calendar"
          width={25}
          height={25}
          className="w-[25px] h-[25px] filter brightness-0 invert"
        />
      </Link>

      {/* 커뮤니티 아이콘 */}
      <Link
        href="/community"
        className="w-[30px] h-[30px] flex items-center justify-center"
      >
        <Image
          src="/nav/nav-earth-globe.png"
          alt="Community"
          width={25}
          height={25}
          className="w-[25px] h-[25px] filter brightness-0 invert"
        />
      </Link>

      {/* + 버튼  */}
      <Link
        href="/write-date"
        className="w-[40px] h-[40px] flex items-center justify-center relative"
      >
        <div className="absolute bg-skin3 rounded-full w-full h-full flex items-center justify-center">
          <Image
            src="/nav/nav-plus.png"
            alt="Add"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </Link>

      {/* 커플 스페이스 아이콘 */}
      <Link
        href="/couple-space"
        className="w-[30px] h-[30px] flex items-center justify-center"
      >
        <Image
          src="/nav/nav-heart.png"
          alt="Couple Space"
          width={25}
          height={25}
          className="w-[25px] h-[25px] filter brightness-0 invert"
        />
      </Link>

      {/* 마이페이지 아이콘 */}
      <Link
        href="/my-page"
        className="w-[30px] h-[30px] flex items-center justify-center"
      >
        <Image
          src="/nav/nav-user.png"
          alt="My Page"
          width={25}
          height={25}
          className="w-[25px] h-[25px] filter brightness-0 invert"
        />
      </Link>
    </footer>
  );
};

export default Footer;
