import {
  DEFAULT_NICKNAME,
  PLACEHOLDER_IMAGE,
} from '@/constants/anniversary.constants';
import {
  getCoupleById,
  getUserById,
} from '@/lib/services/anniversary.services';
import { PartnerInfo } from '@/types/anniversary.type';
import { useCallback, useState } from 'react';

export const usePartnerInfo = (
  coupleId: number,
  userId: number,
  token: string,
) => {
  const [partner, setPartner] = useState<PartnerInfo | null>(null);

  const fetchPartnerInfo = useCallback(async () => {
    try {
      const couple = await getCoupleById(coupleId, token);
      // console.log('커플 정보:', couple);
      const partnerId =
        couple.userAId === userId ? couple.userBId : couple.userAId;
      const partnerData = await getUserById(partnerId, token);

      const profileImage = partnerData.profileImage || PLACEHOLDER_IMAGE;

      setPartner({
        id: partnerId,
        profileImage: profileImage,
        nickname: partnerData.nickname || DEFAULT_NICKNAME,
      });
    } catch (error) {
      console.error('파트너 정보 가져오기 실패했습니다.:', error);
      setPartner(null);
    }
  }, [coupleId, userId, token]);

  return { partner, fetchPartnerInfo };
};
