import React, { useState } from 'react';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import useConfig from '@/app/hooks/useConfig';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import { useBundle } from '@/app/hooks/useBundle';
import EmptySectionRenderer from '@/app/components/renderer/EmptySectionRenderer';

export default function IPSViewer() {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);
  const { extractResources } = useBundle();
  const { config } = useConfig();
  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };
  const allResourcesDict = extractResources();
  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => (
        <AccordionTab
          key={config[key].sectionDisplay}
          header={config[key].sectionDisplay}
          className={`${key}`}
          pt={{ content: { className: 'p-0' } }}
        >
          {allResourcesDict[config[key].code]?.length > 0 ? (
            <RootSectionRenderer
              section={config[key].section}
              bundleEntries={allResourcesDict[config[key].code]}
            />
          ) : (
            <EmptySectionRenderer />
          )}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
