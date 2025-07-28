import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

const CalendarNavigation = ({ onPrev, onNext }: CalendarNavigationProps) => (
  <nav aria-label="월간 이동">
    <button
      onClick={onPrev}
      className="absolute left-[-24px] top-[50%] -translate-y-1/2"
      aria-label="이전 달로 이동"
    >
      <ChevronLeft className="w-5 h-5 text-skin2" />
    </button>
    <button
      onClick={onNext}
      className="absolute right-[-24px] top-[50%] -translate-y-1/2"
      aria-label="다음 달로 이동"
    >
      <ChevronRight className="w-5 h-5 text-skin2" />
    </button>
  </nav>
);

export default CalendarNavigation;
