import React from 'react';
import { FaHeart } from 'react-icons/fa';
const CoupleProfileSection = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4 mt-2">
        <div className="flex items-center">
          {/* 내 프로필 빈 공간 */}
          <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-white shadow-md flex items-center justify-center text-gray-600 text-sm">
            나
          </div>
          <FaHeart className="text-red-500 mx-2 text-2xl" />
          {/* 연인 프로필 빈 공간 */}
          <div className="w-14 h-14 rounded-full bg-gray-300 border-2 border-white shadow-md flex items-center justify-center text-gray-600 text-sm">
            상대
          </div>
          <div className="ml-4">
            <p className="text-lg font-semibold text-gray-800">
              차무혁거덩거덩스
            </p>
            <p className="text-sm text-gray-500">From 2025.00.00</p>
          </div>
        </div>
        <p className="text-xl font-bold text-gray-700">D+0000</p>
      </div>

      {/* 소개글 섹션 */}
      <div className="text-gray-600 text-sm mb-4">
        <p className="inline-flex items-center">
          20자임다20자임다20자임다20자임다
          <button className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </p>
      </div>
    </>
  );
};

export default CoupleProfileSection;
