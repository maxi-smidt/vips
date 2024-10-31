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
import { isEmptyDiv } from '@/app/utils/HtmlUtils';

export default function IPSViewer() {
  const { activeIndex, setActiveIndex } = useData();
  const { resourceMap, bundle } = useBundle();
  const { config } = useConfig();

  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  const renderRootSection = (key: string) => {
    const bundleEntries = resourceMap[config[key].code];
    if (!bundleEntries || bundleEntries.length === 0) {
      return (
        <EmptySectionRenderer
          configResource={config[key]}
          message={'No entries available for this section.'}
        />
      );
    }

    const renderedSection = (
      <RootSectionRenderer
        configResource={config[key]}
        bundleEntries={resourceMap[config[key].code]}
        bundle={bundle}
      />
    );

    return isEmptyDiv(renderedSection) ? (
      <EmptySectionRenderer
        configResource={config[key]}
        message={'No entry in the config is matched in the resource'}
      />
    ) : (
      renderedSection
    );
  };

  return (
    <Accordion
      multiple
      activeIndex={activeIndex}
      onTabChange={onTabChange}
      id="mainContentId"
    >
      {Object.keys(config).map((key) => (
        <AccordionTab
          key={config[key].sectionDisplay}
          header={config[key].sectionDisplay}
          className={`${key}`}
          pt={{ content: { className: 'p-0' } }}
        >
          {renderRootSection(key)}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
