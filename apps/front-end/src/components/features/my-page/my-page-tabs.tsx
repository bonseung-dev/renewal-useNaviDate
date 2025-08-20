'use client';

import { useState } from 'react';
import MyPostTab from './my-post-tab';
import MyBookmarksTab from './my-bookmarks-tab';
import Tabs, { TabItem } from '@/components/ui/tabs';

type MyPageTabsProps = {
  userId: number;
  token: string;
};

const MyPageTabs = ({ userId, token }: MyPageTabsProps) => {
  const [activeTab, setActiveTab] = useState<'post' | 'bookmarks'>('post');

  const tabs: TabItem<'post' | 'bookmarks'>[] = [
    { id: 'post', label: '작성한 글' },
    { id: 'bookmarks', label: '북마크' },
  ];

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onChange={setActiveTab}
      ariaLabel="마이페이지 탭 메뉴"
      renderTabContent={(tab) =>
        tab === 'post' ? (
          <MyPostTab userId={userId} token={token} />
        ) : (
          <MyBookmarksTab userId={userId} token={token} />
        )
      }
    />
  );
};

export default MyPageTabs;
