import { ConfigSection, isConfigEntry } from '@/app/types/Config';
import React from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resource: Resource;
}

export default function SectionRenderer({
  configSection,
  depth,
  resource,
}: SectionRendererProps) {
  return (
    <div
      key={configSection.display}
      className={`p-2 bg-gray-${100 * depth} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
    >
      {configSection.display && <h3>{configSection.display}</h3>}
      {configSection.components.map((component) => (
        <ComponentRenderer
          key={uuidv4()}
          configComponent={component}
          resource={resource}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
