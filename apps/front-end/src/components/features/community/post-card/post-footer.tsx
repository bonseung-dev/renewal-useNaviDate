import PostAuthorInfo from './post-author-info';
import PostActions from './post-actions';
import { CommunityPost } from '@use-navi-date/shared';

type PostFooterProps = {
  author: CommunityPost['author'];
  date: Date | string;
  likes: CommunityPost['likes'];
  bookmarks: CommunityPost['bookmarks'];
  likesCount: number;
  bookmarksCount: number;
  postId: number;
  userId?: number;
};

const PostFooter = (props: PostFooterProps) => (
  <footer className="absolute bottom-[20px] left-[20px] right-[20px] h-[36px] flex items-center justify-between">
    <PostAuthorInfo author={props.author} date={props.date} />
    <PostActions
      postId={props.postId}
      likes={props.likes}
      bookmarks={props.bookmarks}
      likesCount={props.likesCount}
      bookmarksCount={props.bookmarksCount}
      userId={props.userId}
    />
  </footer>
);

export default PostFooter;
