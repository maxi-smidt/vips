// BaseAccordion.tsx
import React from 'react';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';

interface BaseAccordionProps {
  sections: { title: string; content: React.ReactNode }[];
  activeIndex: number | number[];
  onTabChange: (event: AccordionTabChangeEvent) => void;
}

const BaseAccordion: React.FC<BaseAccordionProps> = ({
  sections,
  activeIndex,
  onTabChange,
}) => {
  return (
    <Accordion activeIndex={activeIndex} onTabChange={onTabChange}>
      {sections.map((section, index) => (
        <AccordionTab key={index} header={section.title}>
          {section.content}
        </AccordionTab>
      ))}
    </Accordion>
  );
};

export default BaseAccordion;
