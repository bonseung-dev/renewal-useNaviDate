import dayjs from 'dayjs';
import Image from 'next/image';
import { EMOTION_IMAGES } from '@/constants/emotions.constants';
import Tooltip from '@/components/ui/tooltip';
import { CalendarPost } from '@/types/post.type';

type CalendarDayCellProps = {
  day: number | null;
  currentDate: dayjs.Dayjs;
  post: CalendarPost | null | undefined;
  holiday: boolean;
  isToday: boolean;
  isFirstDay: boolean;
  onClick: (day: number) => void;
};

const CalendarDayCell = ({
  day,
  currentDate,
  post,
  holiday,
  isToday,
  isFirstDay,
  onClick,
}: CalendarDayCellProps) => {
  if (!day)
    return <div role="gridcell" className="my-1 mx-auto w-[30px] h-[30px]" />;

  const textColor = isToday
    ? 'text-skin5'
    : holiday
      ? 'text-skin7'
      : isFirstDay
        ? 'text-skin7'
        : 'text-font2';

  const bgColor = isToday ? 'bg-skin1' : '';

  return (
    <div
      role="gridcell"
      onClick={() => onClick(day)}
      className={`relative my-1 mx-auto w-[30px] h-[30px] ${post ? 'cursor-pointer' : ''}`}
      aria-label={`${currentDate.month() + 1}월 ${day}일`}
    >
      <div className={`absolute inset-0 rounded-full transition ${bgColor}`} />
      <div className="relative w-full h-full flex items-center justify-center">
        {post ? (
          <div className="relative w-full h-full">
            <Tooltip content={post.title} position="bottom">
              <figure>
                <div className="relative aspect-square w-full overflow-hidden rounded-full">
                  <Image
                    src={
                      post.images.find((img) => img.isRepresentative)
                        ?.imageUrl || EMOTION_IMAGES[post.emotion]
                    }
                    alt={`${post.title} 대표 이미지`}
                    width={32}
                    height={32}
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover hover:opacity-90"
                  />
                </div>
                <figcaption className="sr-only">{post.title}</figcaption>
              </figure>
            </Tooltip>
          </div>
        ) : (
          <span className={`${textColor} text-l-title4 font-light`}>{day}</span>
        )}
      </div>
    </div>
  );
};

export default CalendarDayCell;
