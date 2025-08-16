import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Anniversary } from '@use-navi-date/shared';

export const useSortedAnniversaries = (anniversaries: Anniversary[]) => {
  return useMemo(
    () =>
      [...anniversaries].sort((a, b) =>
        dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1,
      ),
    [anniversaries],
  );
};
