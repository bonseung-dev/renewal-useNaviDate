import { Anniversary } from '@/types/anniversary.type';
import { useState } from 'react';
import AnniversaryForm from './anniversary-form';
import AnniversaryList from './anniversary-list';

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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [repeat, setRepeat] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {isFormVisible ? (
        <AnniversaryForm
          repeat={repeat}
          onRepeatChange={setRepeat}
          onCancel={() => setIsFormVisible(false)}
        />
      ) : (
        <AnniversaryList
          anniversaries={dummyAnniversaries}
          onAddClick={() => setIsFormVisible(true)}
        />
      )}
    </div>
  );
};

export default AnniversaryTab;
