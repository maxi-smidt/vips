import SectionRenderer from '@/app/components/renderer/SectionRenderer';
import React from 'react';
import { ConfigSection } from '@/app/types/Config';
import { v4 as uuidv4 } from 'uuid';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';
import { View } from '@react-pdf/renderer';

interface RootSectionRendererProps {
  section: ConfigSection;
  bundleEntries: BundleEntry[];
  pdf?: boolean;
}

export default function RootSectionRenderer({
  section,
  bundleEntries,
  pdf,
}: RootSectionRendererProps) {
  const getTitle = (index: number) => {
    if (bundleEntries.length === 1) return undefined;
    return `${section.display} ${index + 1}`;
  };

  if (pdf) {
    return (
      <View>
        {bundleEntries.map((bundleEntry, index) => (
          <SectionRenderer
            configSection={{ ...section, display: getTitle(index) }}
            depth={0}
            resource={bundleEntry.resource!}
          />
        ))}
      </View>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {bundleEntries.map((bundleEntry, index) => (
        <div key={uuidv4()} id={bundleEntry.fullUrl}>
          <SectionRenderer
            configSection={{ ...section, display: getTitle(index) }}
            depth={0}
            resource={bundleEntry.resource!}
          />
        </div>
      ))}
    </div>
  );
}
