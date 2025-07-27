import { Post } from '@/types/post.type';

const WriteContent = ({
  content,
  setContent,
  title,
  setTitle,
}: {
  content: Post['content'];
  setContent: (content: Post['content']) => void;
  title: Post['title'];
  setTitle: (title: Post['title']) => void;
}) => {
  return (
    <section className="w-full flex flex-col justify-center items-center gap-2 mt-2">
      <div className="flex items-center justify-between w-full px-5 gap-1">
        <button className="w-11 h-5 rounded-[50px] border border-skin7 text-xs font-extralight text-skin7">
          달력
        </button>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-left placeholder:text-center placeholder:text-skin2 text-sm font-extralight"
        />
      </div>
      <div className="w-full px-5">
        <textarea
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full placeholder:text-center placeholder:text-skin2 text-sm font-extralight resize-none"
        />
      </div>
    </section>
  );
};

export default WriteContent;
