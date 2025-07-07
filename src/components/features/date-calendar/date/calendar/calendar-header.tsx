import { Dayjs } from 'dayjs';

type CalendarHeaderProps = {
  currentDate: Dayjs;
};

const CalendarHeader = ({ currentDate }: CalendarHeaderProps) => (
  <header className="text-left mb-3 flex items-baseline">
    <h3 className="text-calendar font-bold text-font3">
      {currentDate.format('MM')}
    </h3>
    <div className="mx-3 h-[26px] w-[1px] bg-font3"></div>
    <h4 className="text-b-h2 font-bold text-font4">
      {currentDate.format('YYYY')}
    </h4>
  </header>
);

export default CalendarHeader;
