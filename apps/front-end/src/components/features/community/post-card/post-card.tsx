import PostImage from './post-image';
import PostHeader from './post-header';
import PostFooter from './post-footer';
import { CommunityPost } from '@use-navi-date/shared';

type PostCardProps = {
  post: CommunityPost;
  userId?: number;
};

const PostCard = ({ post, userId }: PostCardProps) => {
  return (
    <article
      className="w-[280px] h-[320px] rounded-[20px] overflow-hidden relative shadow-shadow1"
      aria-labelledby={`post-${post.id}-title`}
    >
      <div className="absolute inset-0">
        <PostImage images={post.images} title={post.title} />
        <PostHeader title={post.title} tags={post.tags} id={post.id} />
        <PostFooter
          author={post.author}
          createdAt={post.createdAt}
          likes={post.likes}
          bookmarks={post.bookmarks}
          likesCount={post.likesCount}
          bookmarksCount={post.bookmarksCount}
          postId={post.id}
          userId={userId}
        />
      </div>
    </article>
  );
};

export default PostCard;
