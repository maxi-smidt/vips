import React, { useState } from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import useConfig from '@/app/hooks/useConfig';
import { extractResources } from '@/app/utils/ResourceExtractor';
import SectionRenderer from '@/app/components/renderer/SectionRenderer';

interface IPSViewerProps {
  bundle: Bundle;
}

export default function IPSViewer({ bundle }: IPSViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);
  const { config } = useConfig();
  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => (
        <AccordionTab
          key={key}
          header={key}
          className={`target-${key}`}
          pt={{ content: { className: 'p-0' } }}
        >
          <div id={key} className="flex flex-col gap-2">
            <SectionRenderer
              configSection={config[key].section}
              depth={0}
              resources={extractResources(bundle, key)}
            />
          </div>
        </AccordionTab>
      ))}
    </Accordion>
  );
}
