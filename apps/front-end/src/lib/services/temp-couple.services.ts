import { BASE_URL } from '@/constants/url.constants';
import { CoupleResponse } from '@use-navi-date/shared';

/**
 * (지울예정)
 * 커플/유저 관련 데이터(식별자 조회 등)는 원래 Next.js API Route를 통해 처리했으나,
 * 백엔드와 협의 후, 모든 데이터 요청은 독립된 백엔드 API를 직접 호출하도록 변경
 *
 * - Next.js API Route는 프론트 내부 API 통신 및 화면 처리에 용이하지만,
 *   서버리스 환경에서  초기 응답이 느림
 * - 보안상 민감하지 않은 데이터는 쿠키에 저장 가능하며,
 *   인증 관련 쿠키는 HttpOnly, Secure 옵션으로 보호하는 것이 권장됨
 * - 민감한 데이터나 전역 상태 관리는 react-query, zustand 등의 인메모리 캐시 라이브러리를 활용
 */

export const getCoupleById = async (
  coupleId: number,
  token: string,
): Promise<CoupleResponse> => {
  const res = await fetch(`${BASE_URL}/couples/${coupleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('커플 정보를 불러오는데 실패했습니다');
  const json = await res.json();
  // console.log('커플 정보 요청:', json);
  if (!json.success)
    throw new Error(json.message || '커플 정보를 불러오는데 실패했습니다');

  return json.data;
};
