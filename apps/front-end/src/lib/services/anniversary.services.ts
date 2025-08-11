import dayjs from 'dayjs';
import { generateAutoAnniversaries } from '../utils/anniversary.utils';

import {
  Anniversary,
  CoupleResponse,
  CreateAnniversaryDto,
  UserResponse,
} from '@use-navi-date/shared';
import { AnniversaryService } from '../api/services';

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

    const res = await fetch(`/api/anniversaries`, {
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

  const anniversaryData = {
    ...data,
    coupleId,
    createdBy: coupleId,
    date: typeof data.date === 'string' ? new Date(data.date) : data.date,
  };

  const response = await AnniversaryService.createAnniversary(
    anniversaryData,
    token,
  );

  if (!response.data?.anniversary) {
    throw new Error(
      '기념일 생성에 실패했습니다: 서버 응답이 올바르지 않습니다.',
    );
  }
  return response.data.anniversary;
};

export const updateAnniversaryById = async (
  id: number,
  data: Partial<CreateAnniversaryDto>,
  token?: string,
): Promise<Anniversary> => {
  if (!token) throw new Error('인증 토큰이 필요합니다.');

  try {
    const response = await AnniversaryService.updateAnniversary(
      id.toString(),
      data,
      token,
    );
    if (!response.data?.anniversary)
      throw new Error('기념일 수정에 실패했습니다');
    return response.data.anniversary;
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
    await AnniversaryService.deleteAnniversary(id.toString(), token);
  } catch (error) {
    console.error('기념일 삭제 중 오류 발생:', error);
    throw error;
  }
};
