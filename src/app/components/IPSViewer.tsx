import React, { useState } from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import useConfig from '@/app/hooks/useConfig';
import Renderer from '@/app/components/renderer/Renderer';
import { extractResources } from '@/app/utils/ResourceExtractor';

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
        <AccordionTab key={key} header={key}>
          {config[key].map((entry) => (
            <Renderer
              key={`${key}`}
              configEntry={entry}
              resources={extractResources(bundle, key)}
            />
          ))}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
