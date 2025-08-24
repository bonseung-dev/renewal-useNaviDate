'use client';

import React from 'react';

export type TabItem<T extends string> = {
  id: T;
  label: string;
};

type TabsProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  renderTabContent: (activeTab: T) => React.ReactNode;
  ariaLabel?: string;
  tabPadding?: string;
};

const Tabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
  renderTabContent,
  ariaLabel,
  tabPadding = 'py-1 px-8',
}: TabsProps<T>) => {
  return (
    <article>
      {/* 탭 헤더 */}
      <nav aria-label={ariaLabel}>
        <div className="flex justify-center mb-[20px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${tabPadding} text-skin1 ${
                activeTab === tab.id
                  ? 'border-b-2 border-skin1 font-bold text-b-h3'
                  : 'text-l-title3 font-light'
              }`}
              onClick={() => onChange(tab.id)}
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
        {renderTabContent(activeTab)}
      </section>
    </article>
  );
};

export default Tabs;
