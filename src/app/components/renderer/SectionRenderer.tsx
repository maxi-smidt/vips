import {
  ConfigSection,
  isConfigEntry,
  isConfigSection,
} from '@/app/types/Config';
import React from 'react';
import ComponentRenderer from '@/app/components/renderer/ComponentRenderer';
import { v4 as uuidv4 } from 'uuid';

interface SectionRendererProps {
  configSection: ConfigSection;
  depth: number;
  resource: unknown;
}

export default function SectionRenderer({
  configSection,
  depth,
  resource,
}: SectionRendererProps) {
  const getResourceType = (resource: unknown): string | null => {
    if (
      typeof resource === 'object' &&
      resource !== null &&
      'resourceType' in resource
    ) {
      // Safely cast resource to an object to access its properties
      return (resource as { resourceType: string }).resourceType;
    }
    return null; // Return null if resourceType is not available
  };
  const resourceType = getResourceType(resource);
  return (
    <div
      key={configSection.title}
      className={`p-2 bg-gray-${100 * depth} rounded-xl ${depth == 0 && 'flex flex-col gap-2'}`}
    >
      {configSection.renderers.map((component) => {
        if (
          isConfigSection(component) ||
          (isConfigEntry(component) && component.path.split('.')[0]) ===
            resourceType
        ) {
          return (
            <>
              <ComponentRenderer
                key={uuidv4()}
                configComponent={component}
                resource={resource}
                depth={depth + 1}
              />
            </>
          );
        }
        return null; // Return null if no conditions are met
      })}
    </div>
  );
}
