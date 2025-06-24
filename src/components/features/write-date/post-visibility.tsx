import React from 'react';
import PostVisibilitySwitch from './post-visibility-switch';
import PostVisibilityTooltip from './post-visibility-tooltip';

const PostVisibility = () => {
  return (
    <div className="flex justify-end items-center gap-[2px] mr-10 mt-1">
      <PostVisibilitySwitch />
      <PostVisibilityTooltip />
    </div>
  );
};

export default PostVisibility;
