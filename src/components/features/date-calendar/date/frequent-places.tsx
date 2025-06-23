'use client';

import Image from 'next/image';

const frequentPlaces = [
  { name: '원할머니보쌈', ratio: 0.8 },
  { name: 'CGV 대학로점', ratio: 0.7 },
  { name: '타코마씸 신촌점', ratio: 0.5 },
  { name: '커피빈 동교동점', ratio: 0.4 },
];

const FrequentPlaces = () => {
  return (
    <div className="w-[248px] h-[97px] mb-[28px]">
      {/* 아이콘 + 텍스트 */}
      <div className="flex items-center mb-[6px]">
        <div className="w-[36px] h-[36px] flex items-center justify-center mr-2">
          <Image
            src="/Group 270.png"
            alt="위치 아이콘"
            width={14}
            height={17}
          />
        </div>
        <p className="text-b-h3 font-bold text-font3">자주 간 장소 TOP 5</p>
      </div>

      {/* 장소명 + 바 그래프 */}
      <div className="space-y-[2px] ml-[44px]">
        {frequentPlaces.map((place, idx) => (
          <div key={idx} className="flex items-center">
            {/* 장소명 */}
            <span
              className="text-b-h5 text-font2 truncate w-[68px]"
              title={place.name}
            >
              {place.name}
            </span>
            {/* 간격 */}
            <div className="w-[5px]" />
            {/* 바형 그래프 */}
            <div
              className="h-[4px] bg-skin1 rounded"
              style={{ width: `${place.ratio * 125}px` }}
            />
          </div>
        ))}
      </div>

      {/* TODO: 장소별 방문 횟수 데이터 연동 및 그래프 비율 계산 로직 구현 예정 */}
    </div>
  );
};

export default FrequentPlaces;
