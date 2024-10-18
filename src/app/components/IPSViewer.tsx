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

  const renderSection = (
    section: ConfigEntry | ConfigSection,
    resources: unknown[],
    depth: number = 0,
  ) => {
    const elements: React.JSX.Element[] = [];
    if (isConfigEntry(section)) {
      elements.push(
        <Renderer
          key={section.path}
          configEntry={section}
          resources={resources}
        />,
      );
    } else if (isConfigSection(section)) {
      const backgroundClass = `bg-gray-${100 * depth}`;
      elements.push(
        <div
          key={section.title}
          className={`p-2 ${backgroundClass} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
        >
          {section.title && <h2>{section.title}</h2>}
          {section.renderers.map((component) =>
            renderSection(component, resources, depth + 1),
          )}
        </div>,
      );
    }
    return elements;
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
            {renderSection(config[key].section, extractResources(bundle, key))}
          </div>
        </AccordionTab>
      ))}
    </Accordion>
  );
}
