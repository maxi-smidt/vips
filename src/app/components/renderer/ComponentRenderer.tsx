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
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

interface ComponentRendererProps {
  depth: number;
  resource: Resource;
  configComponent: ConfigEntry | ConfigSection;
  bundle: Bundle | undefined;
}

export default function ComponentRenderer({
  configComponent,
  depth,
  resource,
  bundle,
}: ComponentRendererProps) {
  if (isConfigEntry(configComponent)) {
    return (
      <EntryRenderer
        key={configComponent.path}
        configEntry={configComponent}
        resource={resource}
        bundle={bundle}
      />
    );
  } else if (isConfigSection(configComponent)) {
    return (
      <SectionRenderer
        key={configComponent.display}
        depth={depth}
        configSection={configComponent}
        resource={resource}
        bundle={bundle}
      />
    );
  }
  return null;
}
