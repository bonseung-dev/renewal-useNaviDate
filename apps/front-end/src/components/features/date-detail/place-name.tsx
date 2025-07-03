import { CalendarPost } from '@/types/post.type';

const PlaceName = ({ date }: { date: CalendarPost }) => {
  const placeAddress = date.images?.[0]?.address || '장소 정보 없음';
  
  return (
    <section className="flex flex-col justify-center items-start w-full h-full py-3 px-5 gap-1">
      <h3 className="text-skin1 text-[10px] font-semibold">장소</h3>
      <p className="text-font2 text-xs font-extralight">{placeAddress}</p>
    </section>
  );
};

export default PlaceName;
