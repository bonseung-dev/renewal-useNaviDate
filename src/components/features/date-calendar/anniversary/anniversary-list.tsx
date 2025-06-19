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
    <>
      <ul>
        {sorted.map((a) => {
          const isUserCreated = a.created_by === 'user';
          const heartColor = isUserCreated ? '#FAE9A8' : '#7BB4DD';

          return (
            <li
              key={a.id}
              className="w-[320px] h-[80px] relative flex items-center justify-between bg-white px-4"
            >
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#7BB4DD]" />
              <div className="ml-[24px] mr-2 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={heartColor}
                  viewBox="0 0 24 24"
                  stroke="none"
                  className="w-5 h-5"
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
                  <p className="font-semibold text-sm">{a.title}</p>
                  {isUserCreated && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(a.id)}
                        className="text-gray-500 hover:text-[#7BB4DD] transition-colors"
                        aria-label="수정"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(a.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                        aria-label="삭제"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{a.date}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="border border-[#7BB4DD] text-[#7BB4DD] text-xs rounded-full px-3 py-0.5">
                  {calculateDDay(a.date)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default AnniversaryList;
