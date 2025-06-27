import { Switch } from '@/components/ui/switch';

const PostVisibilitySwitch = () => {
  return (
    <label
      htmlFor="public"
      className="text-[8px] flex items-center gap-[1px] text-skin1"
    >
      비공개
      <Switch id="public" className="w-6 h-3" />
    </label>
  );
};

export default PostVisibilitySwitch;
