import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';
import { BundleUtils } from '@smile-cdr/fhirts';
import { ConfigEntry, ConfigSection } from '@/app/types/Config';

const bundleUtils = new BundleUtils();

export function extractResources<T>(
  bundle: Bundle,
  renderers: (ConfigSection | ConfigEntry)[],
): T[] {
  const resourceTypes = new Set<string>();

  function processRenderers(renderers: (ConfigSection | ConfigEntry)[]) {
    renderers.forEach((renderer) => {
      if ('renderer' in renderer) {
        // It's a ConfigEntry, extract the resource type
        const resourceType = renderer.path.split('.')[0];
        resourceTypes.add(resourceType);
      } else if ('renderers' in renderer) {
        // It's a ConfigSection, recurse into its renderers
        processRenderers(renderer.renderers);
      }
    });
  }
  processRenderers(renderers);

  let collectedResources: T[] = [];

  resourceTypes.forEach((resourceType) => {
    // For each resource type, get the resources from the bundle
    const entries = bundleUtils.getResources(bundle.entry!, resourceType) as {
      resource: T;
    }[];

    // Extract the resource from each entry and add to the collected resources
    collectedResources = [
      ...collectedResources,
      ...entries.map((entry) => entry.resource),
    ];
  });

  return collectedResources;
}
