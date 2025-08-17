'use client';

import { useState } from 'react';
import MyPostTab from './my-post-tab';
import MyBookmarksTab from './my-bookmarks-tab';

type MyPageTabsProps = {
  userId: number;
  token: string;
};

const MyPageTabs = ({ userId, token }: MyPageTabsProps) => {
  const [activeTab, setActiveTab] = useState<'post' | 'bookmarks'>('post');

  return (
    <article>
      {/* 탭 헤더 */}
      <nav aria-label="마이페이지 탭 메뉴">
        <div className="flex justify-center mb-[20px]">
          <button
            className={`py-2 px-8 text-skin1 ${activeTab === 'post' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
            onClick={() => setActiveTab('post')}
            aria-current={activeTab === 'post' ? 'page' : undefined}
          >
            작성한 글
          </button>
          <button
            className={`py-2 px-8 text-skin1 ${activeTab === 'bookmarks' ? 'border-b-2 border-skin1 font-bold' : 'text-L-title3 font-light'}`}
            onClick={() => setActiveTab('bookmarks')}
            aria-current={activeTab === 'bookmarks' ? 'page' : undefined}
          >
            북마크
          </button>
        </div>
      </nav>

      {/* 탭 내용 */}
      <section aria-labelledby={`${activeTab}-tab-content`}>
        <h2 id={`${activeTab}-tab-content`} className="sr-only">
          {activeTab === 'post' ? '작성한 글' : '북마크'} 탭 내용
        </h2>
        {activeTab === 'post' ? <MyPostTab /> : <MyBookmarksTab />}
      </section>
    </article>
  );
};

export default MyPageTabs;
