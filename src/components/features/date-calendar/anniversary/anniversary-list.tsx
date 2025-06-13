import { Anniversary } from '@/types/anniversary.type';
import dayjs from 'dayjs';

type AnniversaryListProps = {
  anniversaries: Anniversary[];
};

const AnniversaryList = ({ anniversaries }: AnniversaryListProps) => {
  // 날짜 오름차순 정렬
  const sorted = [...anniversaries].sort((a, b) =>
    dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
  );

  return (
    <div>
      <ul>
        {sorted.map((a) => {
          const isUserCreated = a.created_by === 'user';
          const heartColor = isUserCreated ? '#FAE9A8' : '#7BB4DD';

          return (
            <li
              key={a.id}
              className="w-[320px] h-[80px] relative flex items-center justify-between bg-white rounded-lg px-4"
            >
              {/* 왼쪽 세로줄 */}
              <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-[#7BB4DD]" />

              {/* 하트 아이콘 */}
              <div className="ml-[34px] mr-3 flex items-center justify-center">
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

              {/* 텍스트 정보 */}
              <div className="flex flex-col justify-center">
                <p className="font-semibold text-sm">{a.title}</p>
                <p className="text-xs text-gray-500">{a.date}</p>
              </div>

              {/* D-day 표시 */}
              <div>
                <span className="border border-[#7BB4DD] text-[#7BB4DD] text-xs rounded-full px-3 py-0.5">
                  d-day 들어갈곳
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AnniversaryList;
