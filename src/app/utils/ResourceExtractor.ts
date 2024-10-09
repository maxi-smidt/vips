import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { ResourceType } from '@/app/components/sections/types/ResourceType';
import { BundleUtils } from '@smile-cdr/fhirts';

const bundleUtils = new BundleUtils();

export function extractResource<T>(bundle: Bundle, resourceType: ResourceType) {
  return bundleUtils.getResources(bundle.entry!, resourceType)[0].resource as T;
}

export function extractResources<T>(
  bundle: Bundle,
  resourceType: ResourceType,
) {
  return bundleUtils
    .getResources(bundle.entry!, resourceType)
    .map((entry: { resource: T }) => entry.resource);
}
