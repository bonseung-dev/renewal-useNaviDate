import React from 'react';
import SearchAddressButton from './search-address-button';

const SearchAddress = () => {
  return (
    <div className="relative flex flex-col gap-1 items-center justify-center">
      <div className="text-[10px] text-skin1 font-semibold flex items-start justify-start mr-auto">
        주소
      </div>
      <div className="w-72 h-6 bg-skin2 rounded-full">
        <div className="flex items-center pl-3 py-1 w-full h-full text-skin5 text-xs font-extralight whitespace-nowrap">
          테스트
        </div>
        <SearchAddressButton />
      </div>
    </div>
  );
};

export default SearchAddress;
