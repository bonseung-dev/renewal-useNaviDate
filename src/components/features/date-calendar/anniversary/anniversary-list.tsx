import { useMemo } from 'react';
import { Anniversary } from '@/types/anniversary.type';
import dayjs from 'dayjs';
import { Pencil, Trash2 } from 'lucide-react';

type AnniversaryListProps = {
  anniversaries: Anniversary[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const AnniversaryList = ({
  anniversaries,
  onDelete,
  onEdit,
}: AnniversaryListProps) => {
  const calculateDDay = (date: string) => {
    const today = dayjs().startOf('day');
    const targetDate = dayjs(date).startOf('day');
    const diff = targetDate.diff(today, 'day');

    if (diff === 0) return 'D-Day';
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  const sorted = useMemo(
    () =>
      [...anniversaries].sort((a, b) =>
        dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
      ),
    [anniversaries],
  );

  return (
    <section aria-labelledby="anniversary-list-heading">
      <h2 id="anniversary-list-heading" className="sr-only">
        기념일 목록
      </h2>
      <ul role="list">
        {sorted.map((a) => {
          const isUserCreated = a.createdBy !== 'system';
          const heartColor = isUserCreated ? 'fill-skin6' : 'fill-skin1';

          return (
            <li
              key={a.id}
              role="listitem"
              className="w-[320px] h-[80px] relative flex items-center justify-between bg-white px-4"
            >
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-skin1" />
              <div className="ml-[24px] mr-2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={heartColor}
                  viewBox="0 0 24 24"
                  stroke="none"
                  className={`w-5 h-5 ${heartColor}`}
                  aria-hidden="true"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                    2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                    14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 
                    11.54L12 21.35z"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2">
                  <div className="relative group max-w-[120px]">
                    <h3 className="font-bold text-b-h3 text-font1 truncate cursor-default">
                      {a.title}
                    </h3>

                    {/* 툴팁 */}
                    {a.title.length > 8 && (
                      <div
                        role="tooltip"
                        className="absolute -top-4 left-[53px] -translate-x-1/2 bg-skin1/50 text-skin5 text-l-title5 px-1 rounded-full whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        {a.title}
                      </div>
                    )}
                  </div>
                  {isUserCreated && (
                    <nav aria-label="기념일 액션 메뉴">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onEdit(a.id)}
                          className="text-font4 hover:text-skin1 transition-colors"
                          aria-label={`${a.title} 수정`}
                        >
                          <Pencil size={12} />
                        </button>
                        <button
                          onClick={() => onDelete(a.id)}
                          className="text-font4 hover:text-skin7 transition-colors"
                          aria-label={`${a.title} 삭제`}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </nav>
                  )}
                </div>
                <time dateTime={a.date} className="text-m-h4 text-font1">
                  {a.date}
                </time>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="w-[60px] h-[24px] flex items-center justify-center border border-skin1 text-skin1 text-l-title5 rounded-full px-3 py-0.5">
                  {calculateDDay(a.date)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default AnniversaryList;
