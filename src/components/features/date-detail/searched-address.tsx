import { Date } from '@/app/(routes)/date-detail/[dateId]/page';

const SearchedAddress = ({ date }: { date: Date }) => {
  return (
    <section className="flex flex-col justify-center items-start w-full h-full py-3 px-5 gap-1">
      <h3 className="text-skin1 text-[10px] font-semibold">주소</h3>
      <p className="text-font2 text-xs font-extralight">{date.address}</p>
    </section>
  );
};

export default SearchedAddress;
