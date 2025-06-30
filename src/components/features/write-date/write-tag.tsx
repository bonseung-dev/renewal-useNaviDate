import Image from 'next/image';

const WriteTag = ({
  tags,
  setTags,
  inputValue,
  setInputValue,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
}) => {
  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <section className="flex justify-between items-center gap-1 my-3">
      {tags.map((tag, index) => (
        <div key={index} className="flex justify-center items-center gap-1">
          <div className="flex items-center justify-center w-auto min-w-14 h-6 px-1 rounded-[50px] border border-skin1 text-skin1 text-[10px] font-extralight overflow-hidden">
            #{tag}
          </div>
          <button type="button" onClick={() => deleteTag(index)}>
            <Image
              src="/cancel_icon.png"
              alt="cancel icon"
              width={4}
              height={4}
            />
          </button>
        </div>
      ))}
      <input
        type="text"
        placeholder="#태그입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setTags([...tags, inputValue]);
            setInputValue('');
          }
        }}
        className="w-14 h-6 bg-skin2 rounded-[50px] text-[10px] text-center text-skin5 font-extralight placeholder:text-center placeholder:text-skin5"
      />
    </section>
  );
};

export default WriteTag;
