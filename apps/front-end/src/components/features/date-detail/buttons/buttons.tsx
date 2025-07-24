import { Post } from '@use-navi-date/shared';
import BookmarkButton from './bookmark-button';
import LikeButton from './like-button';
import ShareButton from './share-button';

const Buttons = ({ post }: { post: Post }) => {
  return (
    <section className="flex justify-between items-center w-full h-full py-3 px-5 gap-3">
      <LikeButton post={post} />
      <BookmarkButton post={post} />
      <ShareButton />
    </section>
  );
};

export default Buttons;
