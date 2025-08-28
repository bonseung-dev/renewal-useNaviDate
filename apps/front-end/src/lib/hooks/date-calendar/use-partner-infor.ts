import {
  DEFAULT_NICKNAME,
  PLACEHOLDER_IMAGE,
} from '@/constants/anniversary.constants';
import { getCoupleById } from '@/lib/services/temp-couple.services';
import { PartnerInfo } from '@use-navi-date/shared';
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

      // 내 ID와 비교해서 파트너 정보만 추출
      // console.log('내 ID:', userId);
      const partnerData =
        userId === couple.userA.id ? couple.userB : couple.userA;

      // console.log('파트너 정보:', partnerData);

      const profileImage = partnerData.profileImage || PLACEHOLDER_IMAGE;

      setPartner({
        id: partnerData.id,
        profileImage,
        nickname: partnerData.nickname || DEFAULT_NICKNAME,
      });
    } catch (error) {
      console.error('파트너 정보 가져오기 실패했습니다.:', error);
      setPartner(null);
    }
  }, [coupleId, userId, token]);

  return { partner, fetchPartnerInfo };
};
