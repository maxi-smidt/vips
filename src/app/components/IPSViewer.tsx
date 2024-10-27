import React from 'react';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import useConfig from '@/app/hooks/useConfig';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import { useBundle } from '@/app/hooks/useBundle';
import EmptySectionRenderer from '@/app/components/renderer/EmptySectionRenderer';
import { useData } from '@/app/hooks/useData';

export default function IPSViewer() {
  const { activeIndex, setActiveIndex } = useData();
  const { resourceMap } = useBundle();
  const { config } = useConfig();

  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => {
        const bundleEntries = resourceMap[config[key].code];
        if (!bundleEntries || bundleEntries.length === 0) {
          return null;
        }

        return (
          <AccordionTab
            key={config[key].sectionDisplay}
            header={config[key].sectionDisplay}
            className={`${key}`}
            pt={{ content: { className: 'p-0' } }}
          >
            <RootSectionRenderer
              section={config[key].section}
              bundleEntries={bundleEntries}
            />
          </AccordionTab>
        );
      })}
    </Accordion>
  );
}
