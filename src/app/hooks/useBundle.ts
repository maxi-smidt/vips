import { useContext, useMemo } from 'react';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { Composition } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/composition';
import { CompositionSection } from '@smile-cdr/fhirts/src/FHIR-R4/classes/compositionSection';
import { Reference } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/reference';
import { BundleUtils, ResourceUtils } from '@smile-cdr/fhirts';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';
import { BundleContext } from '@/app/provider/BundleProvider';
import { ResourceMap } from '@/app/types/ResourceMap';

export const useBundle = () => {
  const { bundle, setBundle } = useContext(BundleContext);

  const getResourceByReference = (reference: string): Resource | undefined => {
    return bundle?.entry?.find((x) => x['fullUrl'] === reference)?.resource;
  };

  const getBundleEntryByReference = (
    reference: string,
  ): BundleEntry | undefined => {
    return bundle?.entry?.find(
      (x) => x['fullUrl'] !== undefined && x['fullUrl'].endsWith(reference),
    );
  };

  const resourceMap = useMemo(() => {
    const bundleUtils = new BundleUtils();
    const resourceUtils = new ResourceUtils();
    const sectionResourceDict: ResourceMap = {};
    console.log('check 1');
    if (!bundle?.entry) {
      return sectionResourceDict;
    }
    console.log('check 2');

    const compositions = bundleUtils.getResources(
      bundle!.entry!,
      'Composition',
    );
    console.log('check 3');

    if (compositions.length === 0) {
      return sectionResourceDict;
    }
    console.log('check 4');

    const composition = compositions[0].resource;

    const allSections: CompositionSection[] =
      resourceUtils.getValuesAtResourcePath(composition, 'Composition.section');

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
    addSpecialSection(sectionResourceDict, composition, 'patient', [
      'subject',
      'reference',
    ]);
    addSpecialSection(
      sectionResourceDict,
      composition,
      'author',
      ['reference'],
      ['author'],
    );
    addSpecialSection(
      sectionResourceDict,
      composition,
      'attester',
      ['party', 'reference'],
      ['attester'],
    );
    addSpecialSection(sectionResourceDict, composition, 'custodian', [
      'custodian',
      'reference',
    ]);
    return sectionResourceDict;
  }, [bundle]);

  return {
    bundle,
    setBundle,
    resourceMap,
    getResourceByReference,
  };

  /**
   * @param resourceMap the resource map
   * @param composition the composition of the bundle
   * @param section the name of the section e.g. patient
   * @param pathToReference the path to the reference
   * @param pathToObjects the path to the array that stores the references (not used if only one reference expected)
   */
  function addSpecialSection(
    resourceMap: ResourceMap,
    composition: Composition,
    section: string,
    pathToReference: string[],
    pathToObjects?: string[],
  ) {
    const values: BundleEntry[] = [];
    const references = pathToObjects
      ? (getValueByPath(composition, pathToObjects) as unknown[])
      : [getValueByPath(composition, pathToReference) as string];

    references?.forEach((reference) => {
      const ref = (
        pathToObjects ? getValueByPath(reference, pathToReference) : reference
      ) as string;
      const bundleEntry = getBundleEntryByReference(ref);
      if (bundleEntry) values.push(bundleEntry);
    });

    resourceMap[section] = [...values];
  }

  function getValueByPath(rootObject: unknown, path: string[]): unknown {
    let subject: unknown = rootObject;
    for (const p of path) {
      if (subject && typeof subject === 'object' && p in subject) {
        subject = subject[p as keyof typeof subject];
      } else {
        return undefined;
      }
    }
    return subject;
  }
};
