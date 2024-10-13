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
import {
  ConfigEntry,
  ConfigResource,
  ConfigSection,
  isConfigEntry,
  isConfigSection,
} from '@/app/types/Config';

interface IPSViewerProps {
  bundle: Bundle;
}

export default function IPSViewer({ bundle }: IPSViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | number[]>(0);
  const { config } = useConfig();
  const onTabChange = (e: AccordionTabChangeEvent) => {
    setActiveIndex(e.index);
  };

  const renderResource = (resource: ConfigResource, key: string) => {
    const resources = extractResources(bundle, key);
    return renderSections(resource.sections, resources);
  };

  const renderSections = (
    sections: (ConfigEntry | ConfigSection)[],
    resources: unknown[],
  ) => {
    const elements: React.JSX.Element[] = [];
    for (const value of sections) {
      if (isConfigEntry(value)) {
        elements.push(
          <Renderer
            key={value.path}
            configEntry={value}
            resources={resources}
          />,
        );
      } else if (isConfigSection(value)) {
        elements.push(
          <div key={value.title}>
            <h2>{value.title}</h2>
            {renderSections(value.renderers, resources)}
          </div>,
        );
      }
    }
    return elements;
  };

  return (
    <Accordion multiple activeIndex={activeIndex} onTabChange={onTabChange}>
      {Object.keys(config).map((key) => (
        <AccordionTab key={key} header={key}>
          {renderResource(config[key], key)}
        </AccordionTab>
      ))}
    </Accordion>
  );
}
