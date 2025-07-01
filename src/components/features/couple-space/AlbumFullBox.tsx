import React from 'react';
import { motion, Variants } from 'framer-motion';
import { IoIosArrowDown } from 'react-icons/io';

const slideUpVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
};

type AlbumFullBoxProps = {
  onClose: () => void;
};

const AlbumFullBox = ({ onClose }: AlbumFullBoxProps) => {
  return (
    <motion.div
      className="absolute inset-0 bg-skin1 rounded-[20px] z-20 p-4 flex flex-col"
      variants={slideUpVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center items-center flex-col pt-2 pb-4">
        <button
          onClick={onClose}
          className="flex flex-col items-center justify-center p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <IoIosArrowDown size={28} className="text-gray-600" />
          <span className="text-xs text-gray-500 mt-1">앨범 접기</span>
        </button>
      </div>
      <div className="flex-1">앨범 전체 내용...</div>
    </motion.div>
  );
};

export default AlbumFullBox;
