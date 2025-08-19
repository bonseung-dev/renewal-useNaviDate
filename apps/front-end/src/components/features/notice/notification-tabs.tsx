'use client';

import { useState } from 'react';
import AllTab from './all-tab';
import PostsTab from './posts-tab';
import EventTab from './event-tab';
import AnniversariesTab from './anniversaries-tab';
import Tabs, { TabItem } from '@/components/ui/tabs';

const NotificationTabs = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'event' | 'post' | 'anniversary'
  >('all');

  const tabs: TabItem<typeof activeTab>[] = [
    { id: 'all', label: '전체' },
    { id: 'event', label: '이벤트' },
    { id: 'post', label: '게시글' },
    { id: 'anniversary', label: '기념일' },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
      ariaLabel="알림 탭 메뉴"
      tabPadding="py-q px-4"
      renderTabContent={(tab) =>
        tab === 'all' ? (
          <AllTab />
        ) : tab === 'event' ? (
          <EventTab />
        ) : tab === 'post' ? (
          <PostsTab />
        ) : (
          <AnniversariesTab />
        )
      }
    />
  );
};

export default NotificationTabs;
