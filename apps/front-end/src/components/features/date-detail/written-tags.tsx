import { PostTag } from '@use-navi-date/shared';

const WrittenTags = ({ tags }: { tags: PostTag[] }) => {
  return (
    <section className="flex flex-wrap justify-start items-center w-full py-3 px-5 gap-3">
      {tags.map((tag) => (
        <p
          key={tag.id}
          className="flex justify-center items-center w-fit h-6 p-1 rounded-[50px] border border-skin1 text-skin1 text-[10px] font-extralight whitespace-nowrap"
        >
          #{tag.name}
        </p>
      ))}
    </section>
  );
};

export default WrittenTags;
