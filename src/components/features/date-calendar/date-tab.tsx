import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const DateTab = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  // 현재 월의 시작 요일과 일 수 계산
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day(); // 0(일) ~ 6(토)
  const daysInMonth = currentDate.daysInMonth(); // 해당 월의 총 일 수

  // 월 이동 핸들러
  const handlePrevMonth = () =>
    setCurrentDate(currentDate.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  // 캘린더 날짜 배열 생성
  const days = [];
  // 시작 요일까지 빈 칸 추가
  for (let i = 0; i < startDay; i++) days.push(null);
  // 월의 일수만큼 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // 날짜 클릭 핸들러
  const handleDateClick = (day: number) => {
    const selectedDate = dayjs(
      `${currentDate.year()}-${currentDate.month() + 1}-${day}`,
    ).format('YYYY-MM-DD');
    console.log('Selected date:', selectedDate);
    // 상세 페이지로 이동 또는 모달 표시 예정
  };

  return (
    <div className="space-y-4">
      {/* 캘린더 헤더 (월 이동 및 현재 월 표시) */}
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
                ? 'text-red-500' // 일요일
                : index === 6
                  ? 'text-blue-500' // 토요일
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

          return (
            <div
              key={index}
              onClick={() => isCurrentMonth && handleDateClick(day)}
              className={`aspect-square flex flex-col items-center justify-center rounded-md text-sm ${
                !isCurrentMonth
                  ? 'text-gray-300'
                  : 'cursor-pointer hover:bg-gray-100'
              } ${
                isToday
                  ? 'border-2 border-blue-500 font-bold'
                  : index % 7 === 0
                    ? 'text-red-500' // 일요일
                    : index % 7 === 6
                      ? 'text-blue-500' // 토요일
                      : 'text-gray-700'
              }`}
            >
              {isCurrentMonth && day}
              {/* 데이트 기록이 있는 경우 표시 예정 */}
            </div>
          );
        })}
      </div>

      {/* 한국 공휴일 표시 기능 추가 예정 */}
      {/* 데이트 기록 표시 기능 추가 예정 */}
    </div>
  );
};

export default DateTab;
