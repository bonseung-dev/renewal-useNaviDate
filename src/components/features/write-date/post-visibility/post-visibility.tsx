import PostVisibilitySwitch from './post-visibility-switch';
import PostVisibilityTooltip from './post-visibility-tooltip';

const PostVisibility = ({
  visibility,
  setVisibility,
}: {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}) => {
  return (
    <section className="flex justify-end items-center gap-[2px] mt-1 ml-auto mr-5">
      <PostVisibilitySwitch
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <PostVisibilityTooltip />
    </section>
  );
};

export default PostVisibility;
