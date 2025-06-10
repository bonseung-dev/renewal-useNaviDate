import { getHolidaysByMonth } from '@/lib/services/holiday.services';
import { Holiday } from '@/types/calendar.type';
import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const DateTab = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  // 현재 월의 시작 요일과 일 수 계산
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  useEffect(() => {
    const loadHolidays = async () => {
      const year = currentDate.year();
      const month = currentDate.month() + 1;

      try {
        const data = await getHolidaysByMonth(year, month);
        setHolidays(data);
      } catch (err) {
        console.error('공휴일 로딩 실패', err);
      }
    };

    loadHolidays();
  }, [currentDate]);

  // 월 이동 핸들러
  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  // 캘린더 날짜 배열 생성
  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    const selectedDate = dayjs(
      `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
    ).format('YYYY-MM-DD');
    console.log('Selected date:', selectedDate);
  };

  // 공휴일 스타일 결정 함수
  const getHolidayStyle = (holiday?: Holiday) => {
    if (!holiday) return '';
    return holiday.isLegalHoliday
      ? 'bg-red-100 text-red-600'
      : 'bg-green-100 text-green-600';
  };

  return (
    <div className="space-y-4">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-lg font-semibold">
          {currentDate.format('YYYY년 MM월')}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 요일 표시 */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
          <div
            key={index}
            className={`py-2 text-sm font-medium ${
              index === 0
                ? 'text-red-500'
                : index === 6
                  ? 'text-blue-500'
                  : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 표시 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = day !== null;
          const isToday =
            isCurrentMonth &&
            currentDate.year() === dayjs().year() &&
            currentDate.month() === dayjs().month() &&
            day === dayjs().date();

          const holiday = isCurrentMonth
            ? holidays.find(
                (h) =>
                  dayjs(h.date).date() === day &&
                  dayjs(h.date).month() === currentDate.month() &&
                  dayjs(h.date).year() === currentDate.year(),
              )
            : null;

          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && handleDateClick(day)}
              className={`aspect-square flex flex-col items-center justify-center rounded-md text-sm
                ${!isCurrentMonth ? 'text-gray-300' : 'cursor-pointer hover:bg-gray-50'}
                ${isToday ? 'border-2 border-blue-500 font-bold' : ''}
                ${holiday ? getHolidayStyle(holiday) : ''}
                ${
                  isCurrentMonth && !holiday
                    ? index % 7 === 0
                      ? 'text-red-500'
                      : index % 7 === 6
                        ? 'text-blue-500'
                        : 'text-gray-700'
                    : ''
                }
              `}
            >
              {isCurrentMonth && day}
              {holiday && (
                <span
                  className={`text-[10px] ${holiday.isLegalHoliday ? 'text-red-600' : 'text-green-600'}`}
                >
                  {holiday.summary}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateTab;
