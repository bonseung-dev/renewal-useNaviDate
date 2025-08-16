import { CommunityPost } from '@use-navi-date/shared';
import CommunityStatus from './community-status';
import PostCard from './post-card/post-card';

type PostListProps = {
  posts: CommunityPost[];
  searchQuery: string;
};

const PostList = ({ posts, searchQuery }: PostListProps) => {
  return (
    <div className="flex flex-col gap-[20px] mt-5" role="list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            aria-labelledby={`post-${post.id}-title`}
            role="listitem"
          >
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <CommunityStatus
          type={searchQuery ? 'no-search-results' : 'no-posts'}
        />
      )}
    </div>
  );
};

export default PostList;
