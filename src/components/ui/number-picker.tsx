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
    <div className="flex items-center space-x-1">
      <select
        value={value}
        onChange={handleChange}
        className="border rounded px-1 py-[2px] text-xs min-w-10"
        aria-label={`${label} 선택`}
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
};

export default NumberPicker;
