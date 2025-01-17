import { ConfigSection } from '@/app/types/Config';
import React from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { isEmptyDiv } from '@/app/utils/HtmlUtils';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resource: Resource;
  bundle: Bundle | undefined;
}

export default function SectionRenderer({
  configSection,
  depth,
  resource,
  bundle,
}: SectionRendererProps) {
  const sections = configSection.components.map((component) => {
    return (
      <ComponentRenderer
        key={uuidv4()}
        configComponent={component}
        resource={resource}
        depth={depth + 1}
        bundle={bundle}
      />
    );
  });

  const filteredSections = sections.filter((section) => !isEmptyDiv(section));

  if (filteredSections.length > 0) {
    return (
      <div
        key={configSection.display}
        className={`p-2 bg-gray-${100 * depth} rounded-xl`}
      >
        {configSection.display && <h3>{configSection.display}</h3>}
        <div className={`${depth === 0 ? 'flex flex-col gap-2' : 'ml-4'}`}>
          {filteredSections}
        </div>
      </div>
    );
  }

  return null;
}
