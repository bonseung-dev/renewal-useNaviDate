import { CalendarPost, Holiday } from '@use-navi-date/shared';
import dayjs from 'dayjs';

export const getPostForDate = (posts: CalendarPost[], dateStr: string) => {
  return posts.find((post) => dayjs(post.date).isSame(dateStr, 'day'));
};

export const getHolidayForDate = (holidays: Holiday[], dateStr: string) => {
  return holidays.find((h) => dayjs(h.date).isSame(dateStr, 'day'));
};

export const generateCalendarDays = (currentDate: dayjs.Dayjs) => {
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return days;
};
