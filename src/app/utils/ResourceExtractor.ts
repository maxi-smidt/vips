import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { BundleUtils } from '@smile-cdr/fhirts';

const bundleUtils = new BundleUtils();

export function extractResources<T>(bundle: Bundle, resourceType: string) {
  return bundleUtils
    .getResources(bundle.entry!, resourceType)
    .map((entry: { resource: T }) => entry.resource);
}
