'use client';

import DateTab from './date-tab';
import AnniversaryTab from './anniversary/anniversary-tab';
import { useState } from 'react';

type CalendarTabsProps = {
  coupleId: number;
  startDate: string;
  userId: number;
  token: string;
};

const CalendarTabs = ({
  coupleId,
  startDate,
  userId,
  token,
}: CalendarTabsProps) => {
  const [activeTab, setActiveTab] = useState<'date' | 'anniversary'>('date');

  return (
    <article>
      {/* 탭 헤더 */}
      <nav aria-label="캘린더 탭 메뉴">
        <div className="flex justify-center mb-[20px]">
          <button
            className={`py-2 px-8 text-skin1 ${activeTab === 'date' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
            onClick={() => setActiveTab('date')}
            aria-current={activeTab === 'date' ? 'page' : undefined}
          >
            데이트
          </button>
          <button
            className={`py-2 px-8 text-skin1 ${activeTab === 'anniversary' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
            onClick={() => setActiveTab('anniversary')}
            aria-current={activeTab === 'anniversary' ? 'page' : undefined}
          >
            기념일
          </button>
        </div>
      </nav>

      {/* 탭 내용 */}
      <section aria-labelledby={`${activeTab}-tab-content`}>
        <h2 id={`${activeTab}-tab-content`} className="sr-only">
          {activeTab === 'date' ? '데이트' : '기념일'} 탭 내용
        </h2>
        {activeTab === 'date' ? (
          <DateTab coupleId={coupleId} token={token} />
        ) : (
          <AnniversaryTab
            coupleId={coupleId}
            startDate={startDate}
            userId={userId}
            token={token}
          />
        )}
      </section>
    </article>
  );
};

export default CalendarTabs;
