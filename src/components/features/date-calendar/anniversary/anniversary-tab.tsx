import { Switch } from '@/components/ui/switch';
import { Anniversary } from '@/types/anniversary.type';
import { useState } from 'react';

// 테스트용 더미 기념일 데이터
const dummyAnniversaries: Anniversary[] = [
  {
    id: '1',
    couple_id: 'c1',
    title: '100일',
    date: '2025-09-29',
    repeat: 'none',
    memo: '',
    created_by: 'u1',
  },
  {
    id: '2',
    couple_id: 'c1',
    title: '1주년',
    date: '2026-01-01',
    repeat: 'yearly',
    memo: '첫 해',
    created_by: 'u1',
  },
  {
    id: '3',
    couple_id: 'c1',
    title: '남자친구 생일',
    date: '2026-05-15',
    repeat: 'yearly',
    memo: '선물 준비하기',
    created_by: 'u1',
  },
];

const AnniversaryTab = () => {
  // 폼 표시 여부 상태
  const [isFormVisible, setIsFormVisible] = useState(false);
  // 반복 여부 상태
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {isFormVisible ? (
        // 기념일 입력 폼 UI
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4 text-sm">
          <h2 className="font-semibold text-base">기념일 입력</h2>
          <div className="grid grid-cols-[80px_1fr] items-center gap-3">
            {/* 제목 입력 */}
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              placeholder="기념일 제목"
              className="border rounded px-2 py-1"
            />

            {/* 날짜 입력 (day-picker 적용 예정) */}
            <label htmlFor="date">날짜</label>
            <input
              id="date"
              type="text"
              placeholder="날짜 선택 (day-picker 적용 예정)"
              className="border rounded px-2 py-1"
            />

            {/* 반복 여부 토글 */}
            <label htmlFor="repeat">반복</label>
            <div className="flex items-center gap-2">
              <Switch
                id="repeat"
                checked={repeat}
                onCheckedChange={setRepeat}
              />
              <span className="text-sm">{repeat ? '매년' : '반복 없음'}</span>
            </div>

            {/* 메모 입력 */}
            <label htmlFor="memo">메모</label>
            <textarea
              id="memo"
              placeholder="기념일 메모"
              className="border rounded px-2 py-1 h-16 resize-none"
            />
          </div>

          {/* 취소 / 저장 버튼  - 구현 예정정*/}
          <div className="flex gap-2">
            <button
              className="w-full bg-gray-200 hover:bg-gray-300 rounded py-2 font-semibold"
              onClick={() => setIsFormVisible(false)}
            >
              취소
            </button>
            <button className="w-full bg-black text-white rounded py-2 font-semibold">
              저장
            </button>
          </div>
        </div>
      ) : (
        // 기념일 리스트 UI
        <div className="bg-white shadow-md rounded-lg p-4 space-y-4 text-sm">
          <div className="flex justify-between text-base font-semibold">
            {/* 연인 이름 및 날짜 표시 (임시값) */}
            <span>(연인 애칭)의 기념일-임시</span>
            <span className="text-gray-500 text-sm">지금 999일째-임시</span>
          </div>

          {/* 기념일 리스트 출력 */}
          <ul className="space-y-2">
            {dummyAnniversaries.map((a) => (
              <li key={a.id} className="flex justify-between">
                <span>{a.title}</span>
                <span>{a.date}</span>
              </li>
            ))}
          </ul>

          {/* 입력 폼 열기 버튼 */}
          <button
            className="w-full bg-gray-200 hover:bg-gray-300 rounded py-2 font-semibold"
            onClick={() => setIsFormVisible(true)}
          >
            기념일 추가
          </button>
        </div>
      )}
    </div>
  );
};

export default AnniversaryTab;
