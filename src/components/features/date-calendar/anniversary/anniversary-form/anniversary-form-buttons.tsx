import { DialogClose } from '@radix-ui/react-dialog';

type AnniversaryFormButtonsProps = {
  isEditing: boolean;
  onSubmit: () => void;
};

const AnniversaryFormButtons = ({
  isEditing,
  onSubmit,
}: AnniversaryFormButtonsProps) => (
  <div className="flex items-center justify-center gap-2 mt-2">
    <button
      type="button"
      onClick={onSubmit}
      className="w-[100px] h-[32px] bg-skin1 text-font2 rounded-[20px] text-m-h2"
    >
      {isEditing ? '수정' : '저장'}
    </button>
    <DialogClose asChild>
      <button
        type="button"
        className="w-[100px] h-[32px] bg-skin3 text-font2 rounded-[20px] text-m-h2"
        aria-label="취소"
      >
        취소
      </button>
    </DialogClose>
  </div>
);

export default AnniversaryFormButtons;
