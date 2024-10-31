import React from 'react';
import useConfig from '@/app/hooks/useConfig';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import { useBundle } from '@/app/hooks/useBundle';
import EmptySectionRenderer from '@/app/components/renderer/EmptySectionRenderer';
import { isEmptyDiv } from '@/app/utils/HtmlUtils';
import Accordion from '@/app/components/renderer/Accordion';
import AccordionTab from '@/app/components/renderer/AccordionTab';
import { useData } from '@/app/hooks/useData';

export default function IPSViewer() {
  const { activeTabs } = useData();
  const { resourceMap } = useBundle();
  const { config } = useConfig();

  const renderRootSection = (key: string, tabIndex: number) => {
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
        tabIndex={tabIndex}
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
    <Accordion id="mainContentId" activeTabs={activeTabs}>
      {Object.keys(config).map((key, index) => (
        <AccordionTab
          key={config[key].sectionDisplay}
          header={config[key].sectionDisplay}
          isActive={activeTabs.includes(index)}
          className={`${key}`}
          index={index}
        >
          {renderRootSection(key, index)}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
