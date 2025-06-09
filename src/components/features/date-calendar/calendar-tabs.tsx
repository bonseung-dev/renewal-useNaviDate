'use client';

import { useState } from 'react';
import DateTab from './date-tab';
import AnniversaryTab from './anniversary/anniversary-tab';

const CalendarTabs = () => {
  const [activeTab, setActiveTab] = useState<'date' | 'anniversary'>('date');

  return (
    <>
      {/* 탭 헤더 */}
      <div className="flex justify-around mb-4">
        <button
          className={`py-2 px-8 ${activeTab === 'date' ? 'border-b-2 border-black font-bold' : ''}`}
          onClick={() => setActiveTab('date')}
        >
          데이트
        </button>
        <button
          className={`py-2 px-8 ${activeTab === 'anniversary' ? 'border-b-2 border-black font-bold' : ''}`}
          onClick={() => setActiveTab('anniversary')}
        >
          기념일
        </button>
      </div>

      {/* 탭 내용 */}
      <div>{activeTab === 'date' ? <DateTab /> : <AnniversaryTab />}</div>
    </>
  );
};

export default CalendarTabs;
