import SectionRenderer from '@/app/components/renderer/SectionRenderer';
import React from 'react';
import { ConfigResource } from '@/app/types/Config';
import { v4 as uuidv4 } from 'uuid';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';

interface RootSectionRendererProps {
  configResource: ConfigResource;
  bundleEntries: BundleEntry[];
  bundle: Bundle | undefined;
}

export default function RootSectionRenderer({
  configResource,
  bundleEntries,
  bundle,
}: RootSectionRendererProps) {
  const getTitle = (index: number) => {
    if (bundleEntries.length === 1) return undefined;
    return `${configResource.section.display} ${index + 1}`;
  };

  return (
    <div className="flex flex-col gap-2">
      {bundleEntries.map((bundleEntry, index) => (
        <div
          key={uuidv4()}
          id={bundleEntry.fullUrl}
          className={`contentClass${configResource.code}`}
        >
          <SectionRenderer
            configSection={{
              ...configResource.section,
              display: getTitle(index),
            }}
            depth={0}
            resource={bundleEntry.resource!}
            bundle={bundle}
          />
        </div>
      ))}
    </div>
  );
}
