import { CommunityPost } from '@/types/post.type';

type PostHeaderProps = {
  title: string;
  tags: CommunityPost['tags'];
  id: number;
};

const PostHeader = ({ title, tags, id }: PostHeaderProps) => (
  <header className="absolute top-[22px] left-0 w-full text-center px-2">
    <h3 id={`post-${id}-title`} className="text-skin5 text-m-h1 line-clamp-1">
      {title}
    </h3>
    <div className="mt-1 text-skin5 text-m-h4">
      {tags.map((tag) => (
        <span key={tag.id}>#{tag.name} </span>
      ))}
    </div>
  </header>
);

export default PostHeader;
