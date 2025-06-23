import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  return (
    <div className="flex items-center ">
      <Select
        value={value.toString()}
        onValueChange={(v) => onChange(Number(v))}
      >
        <SelectTrigger
          className="w-[48px] h-[40px] px-0 text-l-title4 font-light text-font4 bg-skin3 border-2 border-transparent 
             focus:border-skin1 focus:outline-none rounded text-center justify-center
             ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0
             [&>svg]:hidden"
          aria-label={`${label} 선택`}
        >
          <SelectValue className="text-center w-full" />
        </SelectTrigger>

        <SelectContent
          className="w-[120px] h-[96px] overflow-y-auto bg-skin5 rounded-[20px] shadow-shadow1 
                     scrollbar-thin scrollbar-thumb-skin1 scrollbar-track-skin3"
        >
          {options.map((num) => (
            <SelectItem
              key={num}
              value={num.toString()}
              className="h-[32px] text-center text-font4 cursor-pointer 
                         data-[state=checked]:bg-skin1 hover:bg-skin1"
            >
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-m-h3 text-skin1">{label}</span>
    </div>
  );
};

export default NumberPicker;
