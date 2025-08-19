'use client';

import { useState } from 'react';
import AllTab from './all-tab';
import PostsTab from './posts-tab';
import EventTab from './event-tab';
import AnniversariesTab from './anniversaries-tab';

const NotificationTabs = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'event' | 'post' | 'anniversary'
  >('all');

  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'event', label: '이벤트' },
    { id: 'post', label: '게시글' },
    { id: 'anniversary', label: '기념일' },
  ] as const;

  return (
    <article>
      {/* 탭 헤더 */}
      <nav aria-label="알림 탭 메뉴">
        <div className="flex justify-center mb-[20px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-4 text-skin1 ${
                activeTab === tab.id
                  ? 'border-b-2 border-skin1 text-b-h3 font-bold'
                  : 'text-l-title3 font-light'
              }`}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 탭 내용 */}
      <section aria-labelledby={`${activeTab}-tab-content`}>
        <h2 id={`${activeTab}-tab-content`} className="sr-only">
          {tabs.find((tab) => tab.id === activeTab)?.label} 탭 내용
        </h2>

        {activeTab === 'all' && <AllTab />}
        {activeTab === 'event' && <EventTab />}
        {activeTab === 'post' && <PostsTab />}
        {activeTab === 'anniversary' && <AnniversariesTab />}
      </section>
    </article>
  );
};

export default NotificationTabs;
