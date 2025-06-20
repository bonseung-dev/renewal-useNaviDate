import { ChangeEvent } from 'react';

type NumberPickerProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
};

const NumberPicker = ({
  label,
  min,
  max,
  value,
  onChange,
}: NumberPickerProps) => {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center">
      <select
        value={value}
        onChange={handleChange}
        className="appearance-none w-[48px] h-[40px] text-l-title4 text-font4 rounded text-center bg-skin3"
        aria-label={`${label} 선택`}
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span className="text-m-h3 text-skin1">{label}</span>
    </div>
  );
};

export default NumberPicker;
