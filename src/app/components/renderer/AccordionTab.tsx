import React, { ReactNode } from 'react';
import { useData } from '@/app/hooks/useData';

export interface AccordionTabProps {
  header: string;
  className: string;
  children: ReactNode;
  isActive: boolean;
  index: number;
}

export default function AccordionTab({
  header,
  className,
  children,
  isActive,
  index,
}: AccordionTabProps) {
  const { setActiveTabs } = useData();

  return (
    <div className={`border-1 border-gray-200 rounded-lg ${className}`}>
      <div
        className={`bg-gray-50 hover:bg-gray-100 rounded-t-lg text-left p-4 select-none cursor-pointer
        ${isActive ? 'text-gray-800 border-gray-200' : 'rounded-lg text-gray-500 hover:text-gray-800'}`}
        onClick={() => {
          setActiveTabs((prevState) =>
            isActive
              ? prevState.filter((x) => x !== index)
              : [...prevState, index],
          );
        }}
      >
        <div className="flex gap-2 items-center">
          <i
            className={`pi ${isActive ? 'pi-angle-down' : 'pi-angle-right'}`}
          ></i>
          <div className="font-semibold text-md">{header}</div>
        </div>
      </div>
      <div
        className={`transition-all ease-in-out overflow-hidden ${
          !isActive && 'max-h-0'
        }`}
      >
        <div className="p-0.5">{children}</div>
      </div>
    </div>
  );
}
