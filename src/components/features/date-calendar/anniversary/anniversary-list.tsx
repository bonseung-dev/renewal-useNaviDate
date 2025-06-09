import { Anniversary } from '@/types/anniversary.type';

type AnniversaryListProps = {
  anniversaries: Anniversary[];
  onAddClick: () => void;
};

const AnniversaryList = ({
  anniversaries,
  onAddClick,
}: AnniversaryListProps) => {
  return (
    <div className="bg-white border rounded-lg p-4 space-y-4 text-sm">
      <div className="flex justify-between text-base font-semibold">
        <span>(연인 애칭)의 기념일-임시</span>
        <span className="text-gray-500 text-sm">지금 999일째-임시</span>
      </div>

      <ul className="space-y-2">
        {anniversaries.map((a) => (
          <li key={a.id} className="flex justify-between">
            <span>{a.title}</span>
            <span>{a.date}</span>
          </li>
        ))}
      </ul>

      <button
        className="w-full bg-gray-200 hover:bg-gray-300 rounded py-2 font-semibold"
        onClick={onAddClick}
      >
        기념일 추가
      </button>
    </div>
  );
};

export default AnniversaryList;
