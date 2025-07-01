import Image from 'next/image';

const PostVisibilityTooltip = () => {
  return (
    <div className="relative flex items-center group">
      <Image
        src="/tooltip-question-mark.png"
        alt="tooltip questionMark"
        unoptimized
        className="ml-[2px] cursor-pointer"
        width={12}
        height={12}
      />
      <p className="absolute left-1/2 -translate-x-full top-full z-10 hidden group-hover:flex w-64 h-11 px-3 py-2 bg-skin5 text-font4 text-[9px] rounded-tl-lg rounded-bl-lg rounded-br-lg shadow-[1px_1px_5px_0px_rgba(0,0,0,0.15)]">
        기록 공개 시 다른 사람들이 이 게시글을 볼 수 있어요! 사진과 같은 개인
        정보가 노출되지 않도록 주의하세요.
      </p>
    </div>
  );
};

export default PostVisibilityTooltip;
