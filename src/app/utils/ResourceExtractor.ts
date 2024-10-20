import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { BundleUtils, ResourceUtils } from '@smile-cdr/fhirts';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { CompositionSection } from '@smile-cdr/fhirts/src/FHIR-R4/classes/compositionSection';
import { Reference } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/reference';
import { BundleEntry } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundleEntry';
import { Composition } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/composition';

const bundleUtils = new BundleUtils();
const resourceUtils = new ResourceUtils();

const getResourceWithRufzeichen = (
  bundleEntry: BundleEntry[],
  reference: string,
): Resource => {
  return bundleEntry.find((x) => x['fullUrl'] === reference)!.resource!;
};

export function extractResources(bundle: Bundle): {
  [p: string]: Resource[];
} {
  // Get the Composition resource from the bundle
  const composition: Composition = bundleUtils.getResources(
    bundle.entry!,
    'Composition',
  )[0].resource;

  // Get all sections from the Composition
  const allSections: CompositionSection[] =
    resourceUtils.getValuesAtResourcePath(composition, 'Composition.section');

  // Initialize a dictionary to map section codes to resources
  const sectionResourceDict: { [key: string]: Resource[] } = {};

  // Iterate through each section in the Composition
  allSections.forEach((section: CompositionSection) => {
    // Extract the section code (to identify the IPS section)
    const sectionCode = section?.code?.coding?.at(0)?.code; // Assuming the first coding is used

    // Get all resources (references) from the section
    const allResourceReferences = section.entry;

    // Initialize the section entry in the dictionary with an empty array
    if (sectionCode && !sectionResourceDict[sectionCode]) {
      sectionResourceDict[sectionCode] = [];
    }

    // Iterate through each entry in the section
    allResourceReferences?.forEach((entry: Reference) => {
      // Retrieve the resource using the reference
      if (
        entry.reference != null &&
        bundle.entry != null &&
        sectionCode != null
      ) {
        const resource: Resource = getResourceWithRufzeichen(
          bundle.entry,
          entry.reference,
        );
        sectionResourceDict[sectionCode].push(resource);
      }
    });
  });
  sectionResourceDict['patient'] = [
    getResourceWithRufzeichen(bundle.entry!, composition.subject!.reference!),
  ];

  // Return the section-resource dictionary
  return sectionResourceDict;
}
