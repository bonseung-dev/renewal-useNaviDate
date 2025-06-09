import { Switch } from '@/components/ui/switch';

type AnniversaryFormProps = {
  repeat: boolean;
  onRepeatChange: (checked: boolean) => void;
  onCancel: () => void;
};

const AnniversaryForm = ({
  repeat,
  onRepeatChange,
  onCancel,
}: AnniversaryFormProps) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-4 text-sm">
      <h2 className="font-semibold text-base">기념일 입력</h2>
      <div className="grid grid-cols-[80px_1fr] items-center gap-3">
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          placeholder="기념일 제목"
          className="border rounded px-2 py-1"
        />

        <label htmlFor="date">날짜</label>
        <input
          id="date"
          type="text"
          placeholder="날짜 선택 (day-picker 적용 예정)"
          className="border rounded px-2 py-1"
        />

        <label htmlFor="repeat">반복</label>
        <div className="flex items-center gap-2">
          <Switch
            id="repeat"
            checked={repeat}
            onCheckedChange={onRepeatChange}
          />
          <span className="text-sm">{repeat ? '매년' : '반복 없음'}</span>
        </div>

        <label htmlFor="memo">메모</label>
        <textarea
          id="memo"
          placeholder="기념일 메모"
          className="border rounded px-2 py-1 h-16 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          className="w-full bg-gray-200 hover:bg-gray-300 rounded py-2 font-semibold"
          onClick={onCancel}
        >
          취소
        </button>
        <button className="w-full bg-black text-white rounded py-2 font-semibold">
          저장
        </button>
      </div>
    </div>
  );
};

export default AnniversaryForm;
