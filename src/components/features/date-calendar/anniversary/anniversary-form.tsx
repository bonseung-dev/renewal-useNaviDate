'use client';

import NumberPicker from '@/components/ui/number-picker';
import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import { DialogClose } from '@radix-ui/react-dialog';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Switch } from '@/components/ui/switch';

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
      setTitle(editingAnniversary.title || '');
      const dateObj = dayjs(editingAnniversary.date);
      if (dateObj.isValid()) {
        setYear(dateObj.year());
        setMonth(dateObj.month() + 1);
        setDay(dateObj.date());
      }
      onRepeatChange(editingAnniversary.repeat as RepeatOption);
    } else {
      setTitle('');
      const today = dayjs();
      setYear(today.year());
      setMonth(today.month() + 1);
      setDay(today.date());
      onRepeatChange('YEARLY');
    }
  }, [editingAnniversary, onRepeatChange]);

  const isYearly = repeat === 'YEARLY';
  const handleSwitch = (checked: boolean) => {
    onRepeatChange(checked ? 'YEARLY' : 'NONE');
  };

  const handleSubmit = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (trimmedTitle.length > 15) {
      alert('제목은 15자 이하로 입력해주세요.');
      return;
    }

    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSubmit({ title: trimmedTitle, date, repeat });

    if (!editingAnniversary) {
      setTitle('');
      setYear(today.year());
      setMonth(today.month() + 1);
      setDay(today.date());
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-[258px] h-[251px] mt-[48px] mx-[32px] mb-[32px] box-border flex flex-col justify-between"
      aria-labelledby="anniversary-form-heading"
    >
      <div>
        <h2
          id="anniversary-form-heading"
          className="font-bold text-b-h2 text-skin1 mb-[16px]"
        >
          {editingAnniversary ? '기념일 수정' : '기념일 추가'}
        </h2>

        {/* 제목 인풋 */}
        <fieldset className="flex flex-col mb-[12px] relative">
          <div className="flex items-center">
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
              maxLength={20}
              className="bg-skin3 rounded px-2 py-1 text-l-title4 font-light text-font1 h-[32px] w-[200px] placeholder:text-l-title4 placeholder:text-font4
             focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-describedby="title-help"
            />
          </div>

          {/* 15자 초과 시 안내 텍스트 */}
          {title.trim().length > 15 && (
            <div
              id="title-help"
              role="alert"
              className="absolute -top-5 left-[90px] z-10 bg-skin7/50 text-skin5 text-l-title5 px-1 rounded-full shadow transition-opacity duration-200"
            >
              15자까지 입력할 수 있어요.
            </div>
          )}
        </fieldset>

        {/* 날짜 선택 */}
        <fieldset className="flex items-center mb-[12px]">
          <legend className="text-b-h3 font-bold w-[56px] text-skin1 sr-only">
            날짜
          </legend>
          <div className="flex gap-2 w-[200px]">
            <NumberPicker
              key={`year-${year}`}
              label="년"
              min={2000}
              max={2050}
              value={year}
              onChange={setYear}
            />
            <NumberPicker
              key={`month-${month}`}
              label="월"
              min={1}
              max={12}
              value={month}
              onChange={setMonth}
            />
            <NumberPicker
              key={`day-${day}-${month}-${year}`}
              label="일"
              min={1}
              max={dayjs(`${year}-${month}-01`).daysInMonth()}
              value={day}
              onChange={setDay}
            />
          </div>
        </fieldset>

        {/* 반복 스위치 */}
        <div className="flex items-center mb-[32px]">
          <label
            htmlFor="repeat-switch"
            className="text-b-h3 font-bold text-skin1"
          >
            매년 반복
          </label>
          <Switch
            id="repeat-switch"
            checked={isYearly}
            onCheckedChange={handleSwitch}
            className="ml-auto w-[72px] h-[32px]"
            thumbClassName="h-[28px] w-[28px] data-[state=checked]:translate-x-[41px]"
            aria-label="매년 반복 설정"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <button
          type="submit"
          className="w-[100px] h-[32px] bg-skin1 text-font2 rounded-[20px] text-m-h2"
        >
          {editingAnniversary ? '수정' : '저장'}
        </button>
        <DialogClose asChild>
          <button
            type="button"
            className="w-[100px] h-[32px] bg-skin3 text-font2 hover:bg-gray-300 rounded-[20px] text-m-h2"
            aria-label="취소"
          >
            취소
          </button>
        </DialogClose>
      </div>
    </form>
  );
};

export default AnniversaryForm;
