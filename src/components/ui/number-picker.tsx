const NumberPicker = ({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) => {
  const options = [];
  for (let i = min; i <= max; i++) {
    options.push(i);
  }

  return (
    <div className="flex items-center space-x-1">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border rounded px-1 py-[2px] text-xs"
        style={{ minWidth: 40 }}
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
