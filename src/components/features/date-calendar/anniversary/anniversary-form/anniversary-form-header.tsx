import { Switch } from '@/components/ui/switch';

type AnniversaryFormHeaderProps = {
  isEditing: boolean;
  isYearly: boolean;
  onSwitchChange: (checked: boolean) => void;
};

const AnniversaryFormHeader = ({
  isEditing,
  isYearly,
  onSwitchChange,
}: AnniversaryFormHeaderProps) => (
  <div className="flex items-center justify-between mb-[16px]">
    <h2
      id="anniversary-form-heading"
      className="font-bold text-b-h2 text-skin1"
    >
      {isEditing ? '기념일 수정' : '기념일 추가'}
    </h2>

    <div className="flex items-center gap-1">
      <span className="text-m-h4 text-skin1">매년 반복</span>
      <Switch
        id="repeat-switch"
        checked={isYearly}
        onCheckedChange={onSwitchChange}
        className="w-[40px] h-[20px]"
        thumbClassName="h-[16px] w-[16px] data-[state=checked]:translate-x-[20px]"
        aria-label="매년 반복 설정"
      />
    </div>
  </div>
);

export default AnniversaryFormHeader;
