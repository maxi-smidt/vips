import { ConfigSection } from '@/app/types/Config';
import React from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resources: unknown[];
}

export default function SectionRenderer({
  configSection,
  depth,
  resources,
}: SectionRendererProps) {
  return (
    <div
      key={configSection.title}
      className={`p-2 bg-gray-${100 * depth} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
    >
      {configSection.title && <h2>{configSection.title}</h2>}
      {configSection.renderers.map((component) => (
        <ComponentRenderer
          key={uuidv4()}
          configComponent={component}
          resources={resources}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}
