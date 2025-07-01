import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';

type AlbumBoxProps = {
  onOpenAlbum: () => void;
};

const AlbumBox = ({ onOpenAlbum }: AlbumBoxProps) => {
  return (
    <div className="absolute bottom-[120px] left-0 w-full h-[200px] bg-skin1 rounded-[20px] z-0 p-4 flex flex-col justify-start items-center">
      <div className="w-full flex-grow flex justify-center items-center">
        <p>앨범 박스 내용</p>
      </div>
      <button
        className="absolute top-2 px-2 py-1 rounded flex flex-col items-center justify-center bg-skin1 text-gray-600"
        onClick={onOpenAlbum}
      >
        <IoIosArrowUp size={20} />
        <span className="mt-1">앨범 더보기</span>
      </button>
    </div>
  );
};

export default AlbumBox;
