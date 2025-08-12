import dayjs from 'dayjs';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';
import {
  Anniversary,
  CoupleResponse,
  CreateAnniversaryDto,
  UserResponse,
} from '@use-navi-date/shared';
import { AnniversaryService } from '../api/services'; // 사용하려했으나 계속 에러가 발생하여 참고만 하여 구현
import { BASE_URL } from '@/constants/url.constants';

//커플/유저 관련(식별자 조회 등)은 Next.js API Route(프론트->내부 API - 보안상 더 좋다고 알고 있음 but 좀 느린느낌)로 하고,
// -- 프론트 내부 API 통신, 데이터 처리 및 화면 처리 프론트 담당
// -- 보안상 중요하지 않은 데이터는 쿠키 사용 가능
// -- 그게 아니라면 react-query / zustant 등의 인메모리 캐시 라이브러리 사용용
// -- 글로벌 변수, 전역 변수 라이브러리 -> 어느 위치에서든 동일한 변수 참조 가능
// recoil - 프로젝트 망함;, zustant - 최근 대세, redux-toolkit - 어려움;
// 기념일 목록 같은 데이터는 독립 백엔드 API를 직접 호출하도록 사용중
// -- 백엔드 API 사용한다는 것은 데이터 처리는 벡엔드가, 화면 처리는 백엔드에서 보내준 데이터를 프론트가 처리리

// couples.services.ts로 분리 예정
export const getCoupleById = async (
  coupleId: number,
  token: string,
): Promise<CoupleResponse> => {
  const res = await fetch(`/api/couples/${coupleId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('커플 정보를 불러오는데 실패했습니다');
  const json = await res.json();
  // console.log('커플 정보 요청:', json);
  if (!json.success)
    throw new Error(json.message || '커플 정보를 불러오는데 실패했습니다');

  return json.data;
};

// users.services.ts로 분리 예정
export const getUserById = async (
  userId: number,
  token: string,
): Promise<UserResponse> => {
  const res = await fetch(`/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error('사용자 정보를 불러오는데 실패했습니다');

  const json = await res.json();
  if (!json.success)
    throw new Error(json.message || '사용자 정보를 불러오는데 실패했습니다');

  return json.data;
};

export const getAllAnniversariesByCoupleId = async (
  coupleId: number,
  startDate: string,
  token?: string,
): Promise<Anniversary[]> => {
  try {
    // 500오류가 발생
    // const res2 = await fetch(`/api/anniversaries/couple/${coupleId}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // console.log('기념일 응답:', res2);

    const res = await fetch(`${BASE_URL}/anniversaries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('기념일 목록을 불러오는데 실패했습니다');

    // console.log('기념일 응답:', res);
    const resData = await res.json();
    // console.log('기념일 목록 응답:', resData);
    const customAnniversaries: Anniversary[] = resData.data.filter(
      (a: Anniversary) => a.coupleId === coupleId,
    );
    // 자동 생성된 기념일 객체에 필수 필드들을 추가해서 Anniversary 타입에 맞게 수정함
    const autoAnniversaries: Anniversary[] = generateAutoAnniversaries(
      startDate,
      coupleId,
    ).map((a, idx) => ({
      ...a,
      createdAt: new Date(startDate),
      updatedAt: undefined,
      isDeleted: false,
      id: -(idx + 1), // DB ID와 겹칠 우려가 있기 때문에 음수 임시 ID 부여
    }));

    const oneYearLater = dayjs().add(1, 'year');
    return [...autoAnniversaries, ...customAnniversaries]
      .filter((a) => dayjs(a.date).isBefore(oneYearLater))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  } catch (error) {
    console.error('기념일 목록 조회 중 오류 발생:', error);
    return [];
  }
};

export const createAnniversary = async (
  coupleId: number,
  data: Omit<Anniversary, 'id'>,
  token?: string,
): Promise<Anniversary> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const newAnniversary = {
      ...data,
      coupleId,
      createdBy: coupleId,
    };

    const res = await fetch(`${BASE_URL}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newAnniversary),
    });

    if (!res.ok) throw new Error('기념일 생성에 실패했습니다');
    return await res.json();
  } catch (error) {
    console.error('기념일 생성 중 오류 발생:', error);
    throw error;
  }
};

export const updateAnniversaryById = async (
  id: number,
  data: Anniversary,
  token?: string,
): Promise<Anniversary> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const res = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('기념일 수정에 실패했습니다');
    return await res.json();
  } catch (error) {
    console.error('기념일 수정 중 오류 발생:', error);
    throw error;
  }
};

export const deleteAnniversaryById = async (
  id: number,
  token?: string,
): Promise<void> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const res = await fetch(`${BASE_URL}/anniversaries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('기념일 삭제에 실패했습니다');
  } catch (error) {
    console.error('기념일 삭제 중 오류 발생:', error);
    throw error;
  }
};
