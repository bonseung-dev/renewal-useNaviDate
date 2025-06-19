import NumberPicker from '@/components/ui/number-picker';
import { REPEAT_OPTION_LIST } from '@/constants/holiday.constants';
import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

type AnniversaryFormProps = {
  repeat: RepeatOption;
  onRepeatChange: (value: RepeatOption) => void;
  onSubmit: (data: {
    title: string;
    date: string;
    repeat: RepeatOption;
    memo?: string;
  }) => void;
  editingAnniversary?: Anniversary | null;
};

const AnniversaryForm = ({
  repeat,
  onRepeatChange,
  onSubmit,
  editingAnniversary,
}: AnniversaryFormProps) => {
  const today = new Date();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [day, setDay] = useState(today.getDate());

  useEffect(() => {
    if (editingAnniversary) {
      setTitle(editingAnniversary.title);
      const dateParts = editingAnniversary.date.split('-');
      setYear(parseInt(dateParts[0]));
      setMonth(parseInt(dateParts[1]));
      setDay(parseInt(dateParts[2]));
      onRepeatChange(editingAnniversary.repeat);
    }
  }, [editingAnniversary, onRepeatChange]);

  const handleSubmit = () => {
    if (!title) return;

    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    onSubmit({
      title,
      date,
      repeat,
    });

    if (!editingAnniversary) {
      setTitle('');
      setYear(today.getFullYear());
      setMonth(today.getMonth() + 1);
      setDay(today.getDate());
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="font-semibold text-sm mb-4">
        {editingAnniversary ? '기념일 수정' : '기념일 입력'}
      </h2>

      <div className="space-y-4 flex-1">
        <div className="grid grid-cols-[70px_1fr] items-center gap-3">
          <label htmlFor="title" className="text-xs">
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="기념일 제목"
            className="border rounded px-2 py-1.5 text-xs w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-[70px_1fr] items-center gap-3">
          <label className="text-xs">날짜</label>
          <div className="flex gap-2">
            <NumberPicker
              label="년"
              min={2000}
              max={2050}
              value={year}
              onChange={setYear}
            />
            <NumberPicker
              label="월"
              min={1}
              max={12}
              value={month}
              onChange={(v) => {
                setMonth(v);
                const maxDay = new Date(year, v, 0).getDate();
                if (day > maxDay) setDay(maxDay);
              }}
            />
            <NumberPicker
              label="일"
              min={1}
              max={new Date(year, month, 0).getDate()}
              value={day}
              onChange={setDay}
            />
          </div>
        </div>

        <div className="grid grid-cols-[70px_1fr] items-center gap-3">
          <label htmlFor="repeat" className="text-xs">
            반복
          </label>
          <select
            id="repeat"
            value={repeat}
            onChange={(e) => onRepeatChange(e.target.value as RepeatOption)}
            className="border rounded px-2 py-1.5 text-xs w-full"
          >
            {REPEAT_OPTION_LIST.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-6">
        <DialogClose asChild>
          <button className="w-[128px] h-[40px] bg-gray-200 hover:bg-gray-300 rounded font-semibold text-xs">
            취소
          </button>
        </DialogClose>
        <button
          className="w-[128px] h-[40px] bg-black text-white rounded font-semibold text-xs"
          onClick={handleSubmit}
          disabled={!title}
        >
          {editingAnniversary ? '수정' : '저장'}
        </button>
      </div>
    </div>
  );
};

export default AnniversaryForm;
