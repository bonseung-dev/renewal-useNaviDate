import React from 'react';
import PostVisibilitySwitch from './post-visibility-switch';
import PostVisibilityTooltip from './post-visibility-tooltip';

const PostVisibility = () => {
  return (
    <div className="flex justify-end items-center gap-[2px] mt-1 ml-auto mr-5">
      <PostVisibilitySwitch />
      <PostVisibilityTooltip />
    </div>
  );
};

export default PostVisibility;
