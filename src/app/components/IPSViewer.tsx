import React, { useState } from 'react';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import useConfig from '@/app/hooks/useConfig';
import { extractResources } from '@/app/utils/ResourceExtractor';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';

interface IPSViewerProps {
  bundle: Bundle;
}

export default function IPSViewer({ bundle }: IPSViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);
  const { config } = useConfig();
  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };
  const [allResourcesDict] = useState<{
    [p: string]: Resource[];
  }>(extractResources(bundle));

  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => (
        <AccordionTab
          key={config[key].sectionDisplay}
          header={config[key].sectionDisplay}
          className={`target-${key}`}
          pt={{ content: { className: 'p-0' } }}
        >
          {allResourcesDict[config[key].code] && (
            <RootSectionRenderer
              section={config[key].section}
              resources={allResourcesDict[config[key].code]}
            />
          )}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
