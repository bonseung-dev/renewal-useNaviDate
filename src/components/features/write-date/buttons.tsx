const Buttons = () => {
  return (
    <section className="flex justify-between items-center w-full h-full py-3 px-5 gap-3">
      <button className="w-20 h-8 bg-skin6 rounded-lg text-white text-[10px] font-extralight">
        좋아요
      </button>
      <button className="w-20 h-8 bg-skin7 rounded-lg text-white text-[10px] font-extralight">
        북마크
      </button>
      <button className="w-20 h-8 bg-skin1 rounded-lg text-white text-[10px] font-extralight">
        공유
      </button>
    </section>
  );
};

export default Buttons;
