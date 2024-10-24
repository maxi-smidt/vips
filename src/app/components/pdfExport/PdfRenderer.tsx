import { Document, Page, View } from '@react-pdf/renderer';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';
import { Config } from '@/app/types/Config';
import RootSectionRenderer from '@/app/components/renderer/RootSectionRenderer';
import EmptySectionRenderer from '@/app/components/renderer/EmptySectionRenderer';
import React from 'react';

interface PdfRendererProps {
  resourceMap: { [p: string]: BundleEntry[] };
  config: Config;
}

export default function PdfRenderer({ resourceMap, config }: PdfRendererProps) {
  return (
    <Document>
      <Page size="A4">
        {Object.keys(config).map((key) => (
          <View key={config[key].sectionDisplay}>
            {resourceMap[config[key].code]?.length > 0 ? (
              <RootSectionRenderer
                section={config[key].section}
                bundleEntries={resourceMap[config[key].code]}
                pdf={true}
              />
            ) : (
              <EmptySectionRenderer />
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
