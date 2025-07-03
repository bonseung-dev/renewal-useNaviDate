import { CalendarPost } from '@/types/post.type';

const WrittenTags = ({ date }: { date: CalendarPost }) => {
  // CalendarPost 타입에는 tags 필드가 없으므로 임시로 빈 배열 사용
  const tags: string[] = [];
  
  return (
    <section className="flex flex-wrap justify-start items-center w-full py-3 px-5 gap-3">
      {tags.map((tag, index) => (
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
