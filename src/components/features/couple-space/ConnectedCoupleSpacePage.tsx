import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import CoupleProfileSection from './CoupleProfileSection';
import AlbumBox from './AlbumBox';
import ChatBox from './ChatBox';
import AlbumFullBox from './AlbumFullBox';
import ChatFullBox from './ChatFullBox';

// 기본 뷰 페이드 인/아웃 애니메이션
const defaultViewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const ConnectedCoupleSpacePage = () => {
  const [view, setView] = useState<'default' | 'album' | 'chat' | null>(
    'default',
  );
  const [showDefault, setShowDefault] = useState(true);

  const handleClose = () => {
    setShowDefault(false);
    setView(null);
  };

  const handleExitComplete = () => {
    if (view === null) {
      setView('default');
      setShowDefault(true);
    }
  };

  return (
    <div className="relative h-full overflow-hidden">
      <AnimatePresence onExitComplete={handleExitComplete}>
        {/* 앨범 전체 보기 뷰 */}
        {view === 'album' && <AlbumFullBox onClose={handleClose} />}

        {/* 채팅 전체 보기 뷰 */}
        {view === 'chat' && <ChatFullBox onClose={handleClose} />}
      </AnimatePresence>

      {/* 기본 뷰 */}
      {showDefault && view === 'default' && (
        <motion.div
          className="absolute inset-0 p-4"
          variants={defaultViewVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 연인 프로필 정보 섹션 */}
          <CoupleProfileSection />

          {/* 앨범 박스 */}
          <AlbumBox onOpenAlbum={() => setView('album')} />

          {/* 채팅 박스 */}
          <ChatBox onOpenChat={() => setView('chat')} />
        </motion.div>
      )}
    </div>
  );
};

export default ConnectedCoupleSpacePage;
