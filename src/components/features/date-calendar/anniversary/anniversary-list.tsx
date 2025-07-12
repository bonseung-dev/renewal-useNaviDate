import { Anniversary } from '@/types/anniversary.type';
import AnniversaryItem from './anniversary-item';
import { useSortedAnniversaries } from '@/lib/hooks/date-calendar/use-sorted-anniversaries';

type AnniversaryListProps = {
  anniversaries: Anniversary[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const AnniversaryList = ({
  anniversaries,
  onDelete,
  onEdit,
}: AnniversaryListProps) => {
  const sorted = useSortedAnniversaries(anniversaries);

  return (
    <section aria-labelledby="anniversary-list-heading">
      <h2 id="anniversary-list-heading" className="sr-only">
        기념일 목록
      </h2>
      <ul role="list">
        {sorted.map((anniversary) => (
          <AnniversaryItem
            key={anniversary.id}
            anniversary={anniversary}
            onEdit={() => onEdit(anniversary.id)}
            onDelete={() => onDelete(anniversary.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default AnniversaryList;
