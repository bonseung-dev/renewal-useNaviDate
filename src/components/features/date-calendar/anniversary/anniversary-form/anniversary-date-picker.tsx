import NumberPicker from '@/components/ui/number-picker';
import dayjs from 'dayjs';

type AnniversaryDatePickerProps = {
  year: number;
  month: number;
  day: number;
  onYearChange: (value: number) => void;
  onMonthChange: (value: number) => void;
  onDayChange: (value: number) => void;
};

const AnniversaryDatePicker = ({
  year,
  month,
  day,
  onYearChange,
  onMonthChange,
  onDayChange,
}: AnniversaryDatePickerProps) => (
  <fieldset className="flex items-center mb-[12px]">
    <label htmlFor="title" className="text-b-h3 font-bold w-[56px] text-skin1">
      날짜
    </label>
    <div className="flex gap-2 w-[200px]">
      <NumberPicker
        key={`year-${year}`}
        label="년"
        min={2000}
        max={2050}
        value={year}
        onChange={onYearChange}
      />
      <NumberPicker
        key={`month-${month}`}
        label="월"
        min={1}
        max={12}
        value={month}
        onChange={onMonthChange}
      />
      <NumberPicker
        key={`day-${day}-${month}-${year}`}
        label="일"
        min={1}
        max={dayjs(`${year}-${month}-01`).daysInMonth()}
        value={day}
        onChange={onDayChange}
      />
    </div>
  </fieldset>
);

export default AnniversaryDatePicker;
