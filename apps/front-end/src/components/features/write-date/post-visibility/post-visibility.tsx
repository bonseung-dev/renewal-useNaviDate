import PostVisibilitySwitch from './post-visibility-switch';
import PostVisibilityTooltip from './post-visibility-tooltip';

const PostVisibility = () => {
  return (
    <section className="flex justify-end items-center gap-[2px] mt-1 ml-auto mr-5">
      <PostVisibilitySwitch />
      <PostVisibilityTooltip />
    </section>
  );
};

export default PostVisibility;
