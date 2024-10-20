import {
  ConfigEntry,
  ConfigSection,
  isConfigEntry,
  isConfigSection,
} from '@/app/types/Config';
import React from 'react';
import EntryRenderer from '@/app/components/renderer/EntryRenderer';
import SectionRenderer from '@/app/components/renderer/SectionRenderer';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';

interface ComponentRendererProps {
  depth: number;
  resource: Resource;
  configComponent: ConfigEntry | ConfigSection;
}

export default function ComponentRenderer({
  configComponent,
  depth,
  resource,
}: ComponentRendererProps) {
  if (isConfigEntry(configComponent)) {
    return (
      <EntryRenderer
        key={configComponent.path}
        configEntry={configComponent}
        resource={resource}
      />
    );
  } else if (isConfigSection(configComponent)) {
    return (
      <SectionRenderer
        key={configComponent.title}
        depth={depth}
        configSection={configComponent}
        resource={resource}
      />
    );
  }
  return null;
}
