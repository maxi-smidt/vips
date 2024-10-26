import { useContext, useMemo } from 'react';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { Composition } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/composition';
import { CompositionSection } from '@smile-cdr/fhirts/src/FHIR-R4/classes/compositionSection';
import { Reference } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/reference';
import { BundleUtils, ResourceUtils } from '@smile-cdr/fhirts';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';
import { BundleContext } from '@/app/provider/BundleProvider';
import { CompositionAttester } from '@smile-cdr/fhirts/src/FHIR-R4/classes/compositionAttester';

export const useBundle = () => {
  const { bundle, setBundle } = useContext(BundleContext);

  const getResourceByReference = (reference: string): Resource | undefined => {
    return bundle?.entry?.find((x) => x['fullUrl'] === reference)?.resource;
  };

  const resourceMap = useMemo(() => {
    const bundleUtils = new BundleUtils();
    const resourceUtils = new ResourceUtils();
    const sectionResourceDict: { [key: string]: BundleEntry[] } = {};

    const getBundleEntryByReference = (
      reference: string,
    ): BundleEntry | undefined => {
      return bundle?.entry?.find((x) => x['fullUrl'] === reference);
    };

    if (bundle?.entry) {
      const composition: Composition = bundleUtils.getResources(
        bundle!.entry!,
        'Composition',
      )[0].resource;

      const allSections: CompositionSection[] =
        resourceUtils.getValuesAtResourcePath(
          composition,
          'Composition.section',
        );

      allSections.forEach((section: CompositionSection) => {
        const sectionCode = section?.code?.coding?.at(0)?.code; // Assuming the first coding is used
        const allResourceReferences = section.entry;

        if (sectionCode && !sectionResourceDict[sectionCode]) {
          sectionResourceDict[sectionCode] = [];
        }

        allResourceReferences?.forEach((entry: Reference) => {
          if (entry.reference && bundle?.entry && sectionCode) {
            const resource = getBundleEntryByReference(entry.reference);
            if (resource) sectionResourceDict[sectionCode].push(resource);
          }
        });
      });
      sectionResourceDict['patient'] = [
        getBundleEntryByReference(composition.subject!.reference!)!,
      ];
      sectionResourceDict['author'] = [];
      sectionResourceDict['attester'] = [];
      sectionResourceDict['custodian'] = [];
      if (composition.author) {
        composition.author.forEach((resource: Reference) => {
          sectionResourceDict['author'].push(
            getBundleEntryByReference(<string>resource.reference)!,
          );
        });
      }
      if (composition.attester) {
        composition.attester.forEach((attester: CompositionAttester) => {
          sectionResourceDict['attester'].push(
            getBundleEntryByReference(<string>attester.party?.reference)!,
          );
        });
      }
      if (composition.custodian) {
        sectionResourceDict['custodian'] = [
          getBundleEntryByReference(<string>composition.custodian.reference)!,
        ];
      }
    }
    return sectionResourceDict;
  }, [bundle]);

  return {
    bundle,
    setBundle,
    resourceMap,
    getResourceByReference,
  };
};
