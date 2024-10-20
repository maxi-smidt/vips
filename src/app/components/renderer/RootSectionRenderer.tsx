import SectionRenderer from '@/app/components/renderer/SectionRenderer';
import React from 'react';
import { ConfigSection } from '@/app/types/Config';
import { v4 as uuidv4 } from 'uuid';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';

interface RootSectionRendererProps {
  section: ConfigSection;
  resources: Resource[];
}

export default function RootSectionRenderer({
  section,
  resources,
}: RootSectionRendererProps) {
  const getTitle = (index: number) => {
    if (resources.length === 1) return undefined;
    return `${section.title} ${index + 1}`;
  };

  return (
    <div className="flex flex-col gap-2">
      {resources.map((resource, index) => (
        <div key={uuidv4()}>
          {getTitle(index) && <h3 className="pl-2">{getTitle(index)}</h3>}
          <SectionRenderer
            configSection={section}
            depth={0}
            resource={resource}
          />
        </div>
      ))}
    </div>
  );
}
