'use client';

import { MapPin } from 'lucide-react';

const frequentPlaces = [
  { name: '원할머니보쌈', ratio: 0.8 },
  { name: 'CGV 대학로점', ratio: 0.7 },
  { name: '타코마씸 신촌점', ratio: 0.5 },
  { name: '커피빈 동교동점', ratio: 0.4 },
  { name: '커피빈 동교동점', ratio: 0.4 },
];

const FrequentPlaces = () => {
  return (
    <div className="w-[280px] h-[124px] rounded-[12px] bg-skin2 p-[8px]">
      {/* 아이콘 + 제목 */}
      <div className="flex items-center">
        <div className="w-[36px] h-[36px] rounded-full bg-skin5 flex items-center justify-center">
          <MapPin className="w-[20px] h-[20px] text-skin1" />
        </div>
        <p className="ml-[8px] text-b-h3 font-bold text-font3">
          자주 간 장소 TOP 5
        </p>
      </div>

      {/* 리스트 */}
      <div className=" ml-[44px]">
        {frequentPlaces.map((place, idx) => (
          <div key={idx} className="flex items-center">
            {/* 장소명 */}
            <span
              className="text-b-h5 text-font2 truncate w-[68px]"
              title={place.name}
            >
              {place.name}
            </span>
            {/* 그래프 */}
            <div className="ml-[4px] w-[132px] h-[4px] bg-skin5 rounded-[2px] overflow-hidden">
              <div
                className="h-full bg-skin1"
                style={{ width: `${place.ratio * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentPlaces;
