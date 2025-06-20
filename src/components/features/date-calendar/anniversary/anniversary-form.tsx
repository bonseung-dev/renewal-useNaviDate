import NumberPicker from '@/components/ui/number-picker';
import { REPEAT_OPTION_LIST } from '@/constants/holiday.constants';
import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

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
  const today = dayjs();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(today.year());
  const [month, setMonth] = useState(today.month() + 1);
  const [day, setDay] = useState(today.date());

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
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    onSubmit({
      title,
      date,
      repeat,
    });

    if (!editingAnniversary) {
      setTitle('');
      setYear(today.year());
      setMonth(today.month() + 1);
      setDay(today.date());
    }
  };

  return (
    <div className="w-[258px] h-[251px] mt-[48px] mx-[32px] mb-[32px] box-border flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-b-h2 text-skin1 mb-[16px]">
          {editingAnniversary ? '기념일 수정' : '기념일 추가'}
        </h2>

        <div className="flex items-center mb-[12px]">
          <label
            htmlFor="title"
            className="text-b-h3 font-bold w-[56px] text-skin1"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="제목(1~15자)을 입력해주세요"
            className="bg-skin3 rounded px-2 py-1 text-l-title4 text-font1 h-[32px] w-[200px]  placeholder:text-l-title4 placeholder:text-font4"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            aria-describedby="title-description"
          />
        </div>

        <div className="flex items-center mb-[12px]">
          <label className="text-b-h3 font-bold w-[56px] text-skin1">
            날짜
          </label>
          <div className="flex gap-2 w-[200px]">
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
                const maxDay = dayjs(`${year}-${v}`).daysInMonth();
                if (day > maxDay) setDay(maxDay);
              }}
            />
            <NumberPicker
              label="일"
              min={1}
              max={dayjs(`${year}-${month}`).daysInMonth()}
              value={day}
              onChange={setDay}
            />
          </div>
        </div>

        <div className="flex items-center mb-[32px]">
          <label
            htmlFor="repeat"
            className="text-b-h3 font-bold w-[56px] text-skin1"
          >
            반복
          </label>
          <select
            id="repeat"
            value={repeat}
            onChange={(e) => onRepeatChange(e.target.value as RepeatOption)}
            className="bg-skin3 rounded px-2 py-1 text-l-title4 h-[32px] w-[200px] text-font4 appearance-none"
          >
            {REPEAT_OPTION_LIST.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <button
          className="w-[100px] h-[32px] bg-skin1 text-font2 rounded-[20px] text-m-h2"
          onClick={handleSubmit}
        >
          {editingAnniversary ? '수정' : '저장'}
        </button>
        <DialogClose asChild>
          <button
            className="w-[100px] h-[32px] bg-skin3 text-font2 hover:bg-gray-300 rounded-[20px] text-m-h2"
            aria-label="취소"
          >
            취소
          </button>
        </DialogClose>
      </div>
    </div>
  );
};

export default AnniversaryForm;
