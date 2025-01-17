import { ConfigEntry } from '@/app/types/Config';
import { rendererMap } from '@/app/types/RendererType';
import { Resource } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/resource';
import { ResourceUtils } from '@/app/utils/ResourceUtils';
import { Bundle } from '@smile-cdr/fhirts/dist/FHIR-R4/classes/bundle';

const resourceUtils = new ResourceUtils();

interface RendererProps {
  configEntry: ConfigEntry;
  resource: Resource;
  bundle: Bundle | undefined;
}

export default function EntryRenderer({
  configEntry,
  resource,
  bundle,
}: RendererProps) {
  const values = isReference()
    ? getReference()
    : getNoneReference(configEntry.path);

  const RendererComponent = rendererMap[configEntry.renderer];

  if (!RendererComponent) {
    throw new Error(`Unknown renderer type: ${configEntry.renderer}`);
  }

  return (
    <div id={configEntry.path}>
      {values.map((value, index) => (
        <div key={`${configEntry.path}-${index}`}>
          {<RendererComponent value={value} configEntry={configEntry} />}
        </div>
      ))}
    </div>
  );

  function isReference() {
    return configEntry.path.indexOf(':') > -1;
  }

  function getNoneReference(path: string) {
    return resourceUtils.getValuesAtResourcePath(resource, path);
  }

  function getReference() {
    const [referencePath, valuePath] = configEntry.path.split(':');
    const values = resourceUtils.getValuesAtResourcePath(
      resource,
      referencePath,
    );
    if (values.length === 0) return [];
    const reference: string = values[0];
    const referencedResource = getResourceByReference(reference);
    return resourceUtils.getValuesAtResourcePath(referencedResource, valuePath);
  }

  function getResourceByReference(reference: string) {
    return bundle?.entry?.find((x) => x['fullUrl'] === reference)?.resource;
  }
}
