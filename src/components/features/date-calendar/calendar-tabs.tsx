'use client';

import { useState } from 'react';
import DateTab from './date-tab';
import AnniversaryTab from './anniversary/anniversary-tab';

type CalendarTabsProps = {
  coupleId: string;
  startDate: string;
  userId: string;
};

const CalendarTabs = ({ coupleId, startDate, userId }: CalendarTabsProps) => {
  const [activeTab, setActiveTab] = useState<'date' | 'anniversary'>('date');

  return (
    <>
      {/* 탭 헤더 */}
      <div className="flex justify-center mb-[20px]">
        <button
          className={`py-2 px-8 text-skin1 ${activeTab === 'date' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
          onClick={() => setActiveTab('date')}
        >
          데이트
        </button>
        <button
          className={`py-2 px-8 text-skin1 ${activeTab === 'anniversary' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
          onClick={() => setActiveTab('anniversary')}
        >
          기념일
        </button>
      </div>

      {/* 탭 내용 */}
      <div>
        {activeTab === 'date' ? (
          <DateTab coupleId={coupleId} />
        ) : (
          <AnniversaryTab
            coupleId={coupleId}
            startDate={startDate}
            userId={userId}
          />
        )}
      </div>
    </>
  );
};

export default CalendarTabs;
