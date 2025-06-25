import Image from 'next/image';
import React from 'react';

const SearchAddressButton = () => {
  return (
    <button>
      <Image
        src="/search-icon.png"
        alt="search icon"
        unoptimized
        className="ml-[2px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/5"
        width={16}
        height={16}
      />
    </button>
  );
};

export default SearchAddressButton;
