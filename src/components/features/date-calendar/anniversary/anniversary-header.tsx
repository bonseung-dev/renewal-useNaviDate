import Image from 'next/image';
import { PartnerInfo } from '@/types/anniversary.type';

type AnniversaryHeaderProps = {
  partner: PartnerInfo | null;
  onAddClick: () => void;
};

const AnniversaryHeader = ({ partner, onAddClick }: AnniversaryHeaderProps) => {
  return (
    <header className="w-[320px] h-[60px] flex items-center justify-between bg-skin1 rounded-[40px] px-4">
      <div className="flex items-center gap-2">
        <figure className="relative h-9 w-9 rounded-full overflow-hidden">
          <Image
            src={partner?.profileImage.url || '/placeholder-image.png'}
            alt={
              partner?.nickname
                ? `${partner.nickname}의 프로필 이미지`
                : '애인 프로필 이미지'
            }
            fill
            sizes="36px"
            className="object-cover"
          />
        </figure>
        <div className="flex flex-col">
          <span className="text-l-title4 font-light text-skin5">
            {partner?.nickname || '애인 이름'}
          </span>
        </div>
      </div>

      <button
        className="text-m-h4 bg-skin1 border border-skin5 hover:bg-skin5 hover:text-skin1 px-2 py-1 rounded-full text-skin5"
        aria-label="기념일 추가"
        onClick={onAddClick}
      >
        추가하기
      </button>
    </header>
  );
};

export default AnniversaryHeader;
