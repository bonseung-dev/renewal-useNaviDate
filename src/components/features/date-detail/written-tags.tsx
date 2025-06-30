import { Date } from '@/app/(routes)/date-detail/[dateId]/page';

const WrittenTags = ({ date }: { date: Date }) => {
  return (
    <section className="flex flex-wrap justify-start items-center w-full py-3 px-5 gap-3">
      {date.tags.map((tag, index) => (
        <p
          key={tag + index}
          className="flex justify-center items-center w-fit h-6 p-1 rounded-[50px] border border-skin1 text-skin1 text-[10px] font-extralight whitespace-nowrap"
        >
          #{tag}
        </p>
      ))}
    </section>
  );
};

export default WrittenTags;
