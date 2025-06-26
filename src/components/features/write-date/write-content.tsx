import React from 'react';

const WriteContent = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2 mt-2">
      <div className="flex items-center justify-between w-full px-5 gap-1">
        <button className="w-11 h-5 rounded-[50px] border border-skin7 text-xs font-extralight text-skin7">
          달력
        </button>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full text-left placeholder:text-center placeholder:text-skin2 text-sm font-extralight"
        />
      </div>
      <div className="w-full px-5">
        <textarea
          placeholder="내용을 입력해주세요."
          className="w-full placeholder:text-center placeholder:text-skin2 text-sm font-extralight resize-none"
        />
      </div>
    </div>
  );
};

export default WriteContent;
