import { ConfigSection, isConfigEntry } from '@/app/types/Config';
import React from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { renderToString } from 'react-dom/server';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resource: Resource;
}

const isEmptyDiv = (component: React.JSX.Element) => {
  const rendered = renderToString(component);
  const emptyDivRegex = /^<div(?: [^>]*)?>\s*<\/div>$/;
  return emptyDivRegex.test(rendered);
};

export default function SectionRenderer({
  configSection,
  depth,
  resource,
}: SectionRendererProps) {
  const sections = configSection.components.map((component) => {
    return (
      <ComponentRenderer
        key={uuidv4()}
        configComponent={component}
        resource={resource}
        depth={depth + 1}
      />
    );
  });

  const filteredSections = sections.filter((section) => !isEmptyDiv(section));

  if (filteredSections.length > 0) {
    return (
      <div
        key={configSection.display}
        className={`p-2 bg-gray-${100 * depth} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
      >
        {configSection.display && <h3>{configSection.display}</h3>}
        {filteredSections}
      </div>
    );
  }

  return null;
}
