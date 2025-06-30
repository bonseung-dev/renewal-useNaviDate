import { Date } from '@/app/(routes)/date-detail/[dateId]/page';

const WrittenContent = ({ date }: { date: Date }) => {
  return (
    <section className="flex flex-col justify-center items-start w-full h-full pt-3 pb-6 px-5 gap-3">
      <h3 className="text-font2 text-sm font-extralight">{date.title}</h3>
      <p className="text-font2 text-xs font-extralight">{date.content}</p>
    </section>
  );
};

export default WrittenContent;
