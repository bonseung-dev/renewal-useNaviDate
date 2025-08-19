'use client';

import { useState } from 'react';
import DateTab from './date-tab';
import AnniversaryTab from './anniversary/anniversary-tab';
import Tabs, { TabItem } from '@/components/ui/tabs';

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

  const tabs: TabItem<'date' | 'anniversary'>[] = [
    { id: 'date', label: '데이트' },
    { id: 'anniversary', label: '기념일' },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
      ariaLabel="캘린더 탭 메뉴"
      renderTabContent={(tab) =>
        tab === 'date' ? (
          <DateTab coupleId={coupleId} token={token} />
        ) : (
          <AnniversaryTab
            coupleId={coupleId}
            startDate={startDate}
            userId={userId}
            token={token}
          />
        )
      }
    />
  );
};

export default CalendarTabs;
