import { WEEKDAYS } from '@/constants/calendar.constants';

const CalendarWeekdays = () => (
  <div
    role="rowgroup"
    className="grid grid-cols-7 text-center text-b-h3 text-font2 font-bold mb-1.5"
  >
    {WEEKDAYS.map((d, i) => (
      <div key={i} role="columnheader" className={i === 0 ? 'text-skin7' : ''}>
        {d}
      </div>
    ))}
  </div>
);

export default CalendarWeekdays;
