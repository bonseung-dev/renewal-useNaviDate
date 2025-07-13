import { Post } from '@/types/post.type';

const WrittenContent = ({ post }: { post: Post }) => {
  return (
    <section className="flex flex-col justify-center items-start w-full h-full pt-3 pb-6 px-5 gap-3">
      <h3 className="text-font2 text-sm font-extralight">{post.title}</h3>
      <p className="text-font2 text-xs font-extralight">{post.content}</p>
    </section>
  );
};

export default WrittenContent;
