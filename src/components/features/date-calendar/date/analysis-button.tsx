'use client';

import AnalysisIcon from './analysis-icon';

type Props = {
  onClick: () => void;
};

const AnalysisButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 w-[280px] h-[80px] rounded-[20px] bg-skin6 flex items-center px-4"
      aria-label="데이트 분석 리포트 보기"
    >
      <AnalysisIcon />

      <div className="flex flex-col justify-center items-start">
        <span className="text-b-h3 font-bold text-font3">데이트 분석</span>
        <span className="text-m-h4 text-font3">
          우리 둘만의 데이트 분석 리포트
        </span>
      </div>
    </button>
  );
};

export default AnalysisButton;
