import PostAuthorInfo from './post-author-info';
import PostActions from './post-actions';
import { CommunityPost } from '@/types/community.type';

type PostFooterProps = {
  author: CommunityPost['author'];
  createdAt: Date;
  likes: CommunityPost['likes'];
  bookmarks: CommunityPost['bookmarks'];
  likesCount: number;
  bookmarksCount: number;
  postId: string;
};

const PostFooter = (props: PostFooterProps) => (
  <footer className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
    <PostAuthorInfo author={props.author} createdAt={props.createdAt} />
    <PostActions
      postId={props.postId}
      likes={props.likes}
      bookmarks={props.bookmarks}
      likesCount={props.likesCount}
      bookmarksCount={props.bookmarksCount}
    />
  </footer>
);

export default PostFooter;
