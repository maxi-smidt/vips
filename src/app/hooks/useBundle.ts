import { useContext } from 'react';
import { DataContext } from '@/app/provider/DataProvider';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { Composition } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/composition';
import { CompositionSection } from '@smile-cdr/fhirts/src/FHIR-R4/classes/compositionSection';
import { Reference } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/reference';
import { BundleUtils, ResourceUtils } from '@smile-cdr/fhirts';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';

export const useBundle = () => {
  const bundleUtils = new BundleUtils();
  const resourceUtils = new ResourceUtils();
  const { bundle, setBundle, expanded, setExpanded } = useContext(DataContext);

  const getResourceByReference = (reference: string): Resource | undefined => {
    return bundle?.entry?.find((x) => x['fullUrl'] === reference)?.resource;
  };

  const getBundleEntryByReference = (
    reference: string,
  ): BundleEntry | undefined => {
    return bundle?.entry?.find((x) => x['fullUrl'] === reference);
  };

  const getResourceMap = (): {
    [p: string]: BundleEntry[];
  } => {
    const composition: Composition = bundleUtils.getResources(
      bundle!.entry!,
      'Composition',
    )[0].resource;
    const allSections: CompositionSection[] =
      resourceUtils.getValuesAtResourcePath(composition, 'Composition.section');

    const sectionResourceDict: { [key: string]: BundleEntry[] } = {};

    allSections.forEach((section: CompositionSection) => {
      const sectionCode = section?.code?.coding?.at(0)?.code; // Assuming the first coding is used
      const allResourceReferences = section.entry;

      if (sectionCode && !sectionResourceDict[sectionCode]) {
        sectionResourceDict[sectionCode] = [];
      }

      allResourceReferences?.forEach((entry: Reference) => {
        if (entry.reference && bundle!.entry && sectionCode) {
          const resource = getBundleEntryByReference(entry.reference);
          if (resource) sectionResourceDict[sectionCode].push(resource);
        }
      });
    });
    sectionResourceDict['patient'] = [
      getBundleEntryByReference(composition.subject!.reference!)!,
    ];
    return sectionResourceDict;
  };

  return {
    expanded,
    setExpanded,
    bundle,
    setBundle,
    extractResources: getResourceMap,
    getResourceByReference,
  };
};
