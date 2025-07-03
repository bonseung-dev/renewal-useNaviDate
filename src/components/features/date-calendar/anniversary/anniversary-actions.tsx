import { Pencil, Trash2 } from 'lucide-react';

type AnniversaryActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
};

const AnniversaryActions = ({
  onEdit,
  onDelete,
  className,
}: AnniversaryActionsProps) => (
  <nav aria-label="액션 메뉴" className={className}>
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="text-font4 hover:text-skin1 transition-colors"
        aria-label="수정"
      >
        <Pencil size={12} />
      </button>
      <button
        onClick={onDelete}
        className="text-font4 hover:text-skin7 transition-colors"
        aria-label="삭제"
      >
        <Trash2 size={12} />
      </button>
    </div>
  </nav>
);

export default AnniversaryActions;
