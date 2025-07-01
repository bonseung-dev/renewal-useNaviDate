'use client';

import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
}

const Tooltip = ({
  children,
  content,
  position = 'bottom',
  show = true,
}: TooltipProps) => {
  const positionClasses = {
    top: 'bottom-[calc(100%+4px)] left-1/2 -translate-x-1/2 before:bottom-[-4px] before:left-1/2 before:-translate-x-1/2 before:rotate-45',
    bottom:
      'top-[calc(100%+4px)] left-1/2 -translate-x-1/2 before:-top-1 before:left-1/2 before:-translate-x-1/2 before:rotate-45',
    left: 'right-[calc(100%+4px)] top-1/2 -translate-y-1/2 before:-right-1 before:top-1/2 before:-translate-y-1/2 before:rotate-45',
    right:
      'left-[calc(100%+4px)] top-1/2 -translate-y-1/2 before:-left-1 before:top-1/2 before:-translate-y-1/2 before:rotate-45',
  };

  return (
    <div className="relative group">
      {children}
      {show && (
        <div
          className={`absolute ${positionClasses[position]} px-3 py-1 text-m-h4 bg-skin1 text-skin5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap shadow-md pointer-events-none before:absolute before:w-2 before:h-2 before:bg-skin1`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
