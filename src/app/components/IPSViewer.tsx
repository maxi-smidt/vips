import React, { useContext } from 'react';
import {
  Accordion,
  AccordionTab,
  AccordionTabChangeEvent,
} from 'primereact/accordion';
import { DataContext } from '../provider/DataProvider';
import useConfig from '@/app/hooks/useConfig';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import { useBundle } from '@/app/hooks/useBundle';
import EmptySectionRenderer from '@/app/components/renderer/EmptySectionRenderer';

export default function IPSViewer() {
  const { activeIndex, setActiveIndex } = useContext(DataContext);
  const { resourceMap } = useBundle();
  const { config } = useConfig();

  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => (
        <AccordionTab
          key={config[key].sectionDisplay}
          header={config[key].sectionDisplay}
          className={`${key}`}
          pt={{ content: { className: 'p-0' } }}
        >
          {resourceMap[config[key].code]?.length > 0 ? (
            <RootSectionRenderer
              section={config[key].section}
              bundleEntries={resourceMap[config[key].code]}
            />
          ) : (
            <EmptySectionRenderer />
          )}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
