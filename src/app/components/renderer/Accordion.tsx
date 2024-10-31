'use client';

import React, { ReactNode, Dispatch, SetStateAction, useState } from 'react';
import { AccordionTabProps } from '@/app/components/renderer/AccordionTab';

interface AccordionProps {
  id: string;
  activeTabs: number[];
  setActiveTabs: Dispatch<SetStateAction<number[]>>;
  children: ReactNode;
}

export default function Accordion({ children, id }: AccordionProps) {
  const [activeTabs, setActiveTabs] = useState<number[]>([]);

  const toggleTab = (index: number) => {
    setActiveTabs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div id={id} className="flex flex-col gap-1">
      {React.Children.map(children, (child, index) =>
        React.isValidElement<AccordionTabProps>(child)
          ? React.cloneElement(child, {
              index,
              isActive: activeTabs.includes(index),
              toggleTab,
            })
          : child,
      )}
    </div>
  );
}
