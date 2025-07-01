import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';

type ChatBoxProps = {
  onOpenChat: () => void;
};

const ChatBox = ({ onOpenChat }: ChatBoxProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[200px] bg-skin6 rounded-[20px] z-10 p-4 shadow-lg flex flex-col justify-start items-center">
      <div className="w-full flex-grow flex justify-center items-center">
        <p>채팅 박스 내용</p>
      </div>
      <button
        className="absolute top-2 px-2 py-1 rounded flex flex-col items-center justify-center bg-skin6 text-gray-600"
        onClick={onOpenChat}
      >
        <IoIosArrowUp size={20} />
        <span className="mt-1">채팅 더보기</span>
      </button>
    </div>
  );
};

export default ChatBox;
