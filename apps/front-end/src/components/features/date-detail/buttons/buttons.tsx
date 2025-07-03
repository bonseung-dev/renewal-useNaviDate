import BookmarkButton from './bookmark-button';
import LikeButton from './like-button';
import ShareButton from './share-button';

const Buttons = () => {
  return (
    <section className="flex justify-between items-center w-full h-full py-3 px-5 gap-3">
      <LikeButton />
      <BookmarkButton />
      <ShareButton />
    </section>
  );
};

export default Buttons;
