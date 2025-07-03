'use client';

import { Anniversary, RepeatOption } from '@/types/anniversary.type';
import { useAnniversaryForm } from '@/lib/hooks/date-calendar/use-anniversary-form';
import AnniversaryFormButtons from './anniversary-form-buttons';
import AnniversaryFormHeader from './anniversary-form-header';
import AnniversaryTitleInput from './anniversary-title-input';
import AnniversaryDatePicker from './anniversary-date-picker';

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
  const {
    title,
    setTitle,
    year,
    setYear,
    month,
    setMonth,
    day,
    setDay,
    isYearly,
    handleSwitch,
    today,
  } = useAnniversaryForm(editingAnniversary, repeat, onRepeatChange);

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
      className="w-[258px] h-[200px] mt-[48px] mx-[32px] mb-[32px] box-border flex flex-col justify-between"
      aria-labelledby="anniversary-form-heading"
    >
      <div>
        <AnniversaryFormHeader
          isEditing={!!editingAnniversary}
          isYearly={isYearly}
          onSwitchChange={handleSwitch}
        />

        <AnniversaryTitleInput title={title} onTitleChange={setTitle} />

        <AnniversaryDatePicker
          year={year}
          month={month}
          day={day}
          onYearChange={setYear}
          onMonthChange={setMonth}
          onDayChange={setDay}
        />
      </div>

      <AnniversaryFormButtons
        isEditing={!!editingAnniversary}
        onSubmit={handleSubmit}
      />
    </form>
  );
};

export default AnniversaryForm;
