'use client';

import React, { ReactNode } from 'react';
import { AccordionTabProps } from '@/app/components/renderer/AccordionTab';

interface AccordionProps {
  id: string;
  activeTabs: number[];
  children: ReactNode;
}

export default function Accordion({ children, id }: AccordionProps) {
  return (
    <div id={id} className="flex flex-col gap-1">
      {React.Children.map(children, (child) =>
        React.isValidElement<AccordionTabProps>(child)
          ? React.cloneElement(child)
          : child,
      )}
    </div>
  );
}
