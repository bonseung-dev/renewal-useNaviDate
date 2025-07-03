type TruncatedTextProps = {
  text: string;
  maxLength: number;
  className?: string;
};

export const TruncatedTextWithTooltip = ({
  text,
  maxLength,
  className,
}: TruncatedTextProps) => (
  <div className="relative group">
    <span className={`truncate ${className}`}>
      {text.slice(0, maxLength)}
      {text.length > maxLength && '...'}
    </span>
    {text.length > maxLength && (
      <div
        role="tooltip"
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-skin2 text-white text-l-title5 font-light px-2 py-1 rounded whitespace-nowrap z-10 opacity-0 group-hover:opacity-80 transition-opacity"
      >
        {text}
      </div>
    )}
  </div>
);
