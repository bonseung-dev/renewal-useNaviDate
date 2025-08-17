import { Switch } from '@/components/ui/switch';
import { Post } from '@use-navi-date/shared';

const PostVisibilitySwitch = ({
  visibility,
  setVisibility,
}: {
  visibility: Post['visibility'];
  setVisibility: (visibility: Post['visibility']) => void;
}) => {
  const handleVisibilityChange = () => {
    setVisibility(visibility === 'public' ? 'private' : 'public');
  };

  return (
    <label
      htmlFor="public"
      className="text-[8px] flex items-center gap-[1px] text-skin1"
    >
      비공개
      <Switch
        id="public"
        className="w-6 h-3 data-[state=checked]:bg-skin2"
        thumbClassName="w-2 h-2 data-[state=checked]:translate-x-3"
        checked={visibility === 'public'}
        onCheckedChange={handleVisibilityChange}
      />
    </label>
  );
};

export default PostVisibilitySwitch;
