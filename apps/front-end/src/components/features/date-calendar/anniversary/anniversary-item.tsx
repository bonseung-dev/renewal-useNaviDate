import AnniversaryActions from './anniversary-actions';
import { Heart } from 'lucide-react';
import TruncatedTextWithTooltip from './truncated-text-with-tooltip';
import {
  calculateDDay,
  isSystemAnniversary,
} from '@/lib/utils/anniversary.utils';
import { Anniversary } from '@use-navi-date/shared';

type AnniversaryItemProps = {
  anniversary: Anniversary;
  onEdit: () => void;
  onDelete: () => void;
};

const AnniversaryItem = ({
  anniversary,
  onEdit,
  onDelete,
}: AnniversaryItemProps) => {
  const isUserCreated = !isSystemAnniversary(anniversary);

  return (
    <li className="w-[320px] h-[80px] relative flex items-center justify-between bg-white px-4">
      <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-skin1" />
      <div className="ml-[24px] mr-2 flex items-center justify-center">
        <Heart
          fill={'currentColor'}
          stroke="currentColor"
          strokeWidth={1.5}
          className={`w-5 h-5 ${isUserCreated ? 'text-skin6' : 'text-skin1'}`}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <div className="flex items-center gap-2">
          <TruncatedTextWithTooltip
            text={anniversary.title}
            maxLength={8}
            className="font-bold text-b-h3 text-font1"
          />
          {isUserCreated && (
            <AnniversaryActions onEdit={onEdit} onDelete={onDelete} />
          )}
        </div>
        <time
          dateTime={
            typeof anniversary.date === 'string'
              ? anniversary.date
              : anniversary.date.toISOString()
          }
          className="text-m-h4 text-font1"
        >
          {typeof anniversary.date === 'string'
            ? anniversary.date
            : anniversary.date.toISOString().slice(0, 10)}
        </time>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="w-[60px] h-[24px] flex items-center justify-center border border-skin1 text-skin1 text-l-title5 rounded-full px-3 py-0.5">
          {calculateDDay(
            typeof anniversary.date === 'string'
              ? anniversary.date
              : anniversary.date.toISOString(),
          )}
        </span>
      </div>
    </li>
  );
};

export default AnniversaryItem;
