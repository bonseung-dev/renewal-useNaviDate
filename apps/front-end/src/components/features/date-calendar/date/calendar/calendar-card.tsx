import { Dispatch, SetStateAction } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import CalendarDayCell from './calendar-day-cell';
import {
  generateCalendarDays,
  getHolidayForDate,
  getPostForDate,
} from '@/lib/utils/calendar.utils';
import CalendarNavigation from './calendar-navigation';
import CalendarHeader from './calendar-header';
import CalendarWeekdays from './calendar-weekday';
import { CalendarPost, Holiday } from '@use-navi-date/shared';

type CalendarCardProps = {
  currentDate: Dayjs;
  setCurrentDate: Dispatch<SetStateAction<Dayjs>>;
  holidays: Holiday[];
  posts: CalendarPost[];
};

const CalendarCard = ({
  currentDate,
  setCurrentDate,
  holidays,
  posts,
}: CalendarCardProps) => {
  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));
  const days = generateCalendarDays(currentDate);

  const handleDateClick = (day: number) => {
    const selected = dayjs(
      `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
    ).format('YYYY-MM-DD');
    console.log('선택된 항목:', selected);
  };

  return (
    <article className="relative w-[280px] rounded-[20px] shadow-shadow1 bg-skin5 p-[32px] pt-[22px] flex flex-col">
      <CalendarNavigation onPrev={handlePrevMonth} onNext={handleNextMonth} />
      <CalendarHeader currentDate={currentDate} />
      <CalendarWeekdays />

      <div role="grid" className="grid grid-cols-7 text-center text-m-h4">
        {days.map((day, idx) => {
          const dateStr = day
            ? dayjs(currentDate).date(day).format('YYYY-MM-DD')
            : '';
          const post = day ? getPostForDate(posts, dateStr) : null;
          const holiday = day ? getHolidayForDate(holidays, dateStr) : null;
          const isToday = day && dayjs().isSame(dateStr, 'day');

          return (
            <CalendarDayCell
              key={idx}
              day={day}
              currentDate={currentDate}
              post={post}
              holiday={!!holiday?.isLegalHoliday}
              isToday={!!isToday}
              isFirstDay={idx % 7 === 0}
              onClick={handleDateClick}
            />
          );
        })}
      </div>
    </article>
  );
};

export default CalendarCard;
