import dayjs from 'dayjs';
import { Anniversary } from '@/types/anniversary.type';

const API_URL = 'http://localhost:4000'; // JSON-Server 기본 URL

// 자동 생성 기념일 (클라이언트 측에서 생성)
const generateAutoAnniversaries = (
  startDate: string,
  coupleId: string,
): Anniversary[] => {
  const days = [100, 200, 300, 365, 500];
  let idCounter = 0;

  return days.map((day) => {
    idCounter++;
    return {
      id: `auto-id-${idCounter.toString().padStart(6, '0')}`,
      coupleId: coupleId,
      title: `${day}일`,
      date: dayjs(startDate).add(day, 'day').format('YYYY-MM-DD'),
      repeat: 'NONE',
      createdBy: 'system',
    };
  });
};

// 기념일 목록 가져오기
export const getAnniversaries = async (
  coupleId: string,
  startDate: string,
): Promise<Anniversary[]> => {
  try {
    // JSON-Server에서 커플의 기념일 가져오기
    const response = await fetch(
      `${API_URL}/anniversaries?coupleId=${coupleId}`,
    );
    if (!response.ok) throw new Error('Failed to fetch anniversaries');

    const customAnniversaries: Anniversary[] = await response.json();

    // 자동 생성 기념일
    const autoAnniversaries = generateAutoAnniversaries(startDate, coupleId);

    // 1년 이내의 기념일만 필터링하여 반환
    const oneYearLater = dayjs().add(1, 'year');
    return [...autoAnniversaries, ...customAnniversaries]
      .filter((a) => dayjs(a.date).isBefore(oneYearLater))
      .sort((a, b) => (dayjs(a.date).isAfter(dayjs(b.date)) ? 1 : -1));
  } catch (error) {
    console.error('Error fetching anniversaries:', error);
    return [];
  }
};

// 기념일 추가
export const addAnniversary = async (
  coupleId: string,
  data: Omit<Anniversary, 'id'>,
  userId: string,
): Promise<Anniversary> => {
  try {
    const newAnniversary = {
      ...data,
      coupleId,
      createdBy: userId,
    };

    const response = await fetch(`${API_URL}/anniversaries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAnniversary),
    });

    if (!response.ok) throw new Error('Failed to add anniversary');

    return await response.json();
  } catch (error) {
    console.error('Error adding anniversary:', error);
    throw error;
  }
};

// 기념일 수정
export const updateAnniversary = async (
  updatedAnniversary: Anniversary,
): Promise<Anniversary> => {
  try {
    const response = await fetch(
      `${API_URL}/anniversaries/${updatedAnniversary.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnniversary),
      },
    );

    if (!response.ok) throw new Error('Failed to update anniversary');

    return await response.json();
  } catch (error) {
    console.error('Error updating anniversary:', error);
    throw error;
  }
};

// 기념일 삭제
export const deleteAnniversary = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/anniversaries/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to delete anniversary');
  } catch (error) {
    console.error('Error deleting anniversary:', error);
    throw error;
  }
};
