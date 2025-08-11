import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAnniversariesByCoupleId } from '@/lib/services/anniversary.services';
import { Anniversary } from '@use-navi-date/shared';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

export const useAnniversariesQuery = (
  coupleId: number,
  startDate: string,
  token: string,
) => {
  return useQuery<Anniversary[]>({
    queryKey: QUERY_KEYS.ANNIVERSARIES_BY_COUPLE(coupleId),
    queryFn: () => getAllAnniversariesByCoupleId(coupleId, startDate, token),
    enabled: !!coupleId && !!token,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
