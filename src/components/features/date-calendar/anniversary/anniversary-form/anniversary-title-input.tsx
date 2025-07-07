type AnniversaryTitleInputProps = {
  title: string;
  onTitleChange: (value: string) => void;
};

const AnniversaryTitleInput = ({
  title,
  onTitleChange,
}: AnniversaryTitleInputProps) => (
  <fieldset className="flex flex-col mb-[12px] relative">
    <div className="flex items-center">
      <label
        htmlFor="title"
        className="text-b-h3 font-bold w-[56px] text-skin1"
      >
        제목
      </label>
      <input
        id="title"
        type="text"
        placeholder="제목(1~15자)을 입력해주세요"
        maxLength={20}
        className="bg-skin3 rounded px-2 py-1 text-l-title4 font-light text-font1 h-[32px] w-[200px] placeholder:text-l-title4 placeholder:text-font4
       focus:outline-none focus:ring-2 focus:ring-skin1 focus:border-transparent"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
        aria-describedby="title-help"
      />
    </div>

    {title.trim().length > 15 && (
      <div
        id="title-help"
        role="alert"
        className="absolute -top-4 left-[90px] z-10  text-skin7 text-l-title5 px-1 transition-opacity duration-200"
      >
        15자까지 입력할 수 있어요.
      </div>
    )}
  </fieldset>
);

export default AnniversaryTitleInput;
